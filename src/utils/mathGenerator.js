/**
 * Sinh số ngẫu nhiên trong khoảng [min, max] (bao gồm cả min và max)
 */
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Trộn ngẫu nhiên một mảng (Fisher-Yates Shuffle)
 */
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/**
 * Tạo các lựa chọn sai (distractors) gần với đáp án đúng
 * @param {number} correctAns - Đáp án đúng
 * @param {number} minVal - Giá trị tối thiểu cho lựa chọn
 * @param {number} maxVal - Giá trị tối đa cho lựa chọn
 * @returns {number[]} Mảng gồm 4 đáp án (1 đúng, 3 sai) đã được trộn
 */
const generateOptions = (correctAns, minVal = 1, maxVal = 100) => {
  const optionsSet = new Set([correctAns]);
  
  // Các sai số phổ biến: cộng trừ 1, 2, 3, 4, 10
  const offsets = [1, -1, 2, -2, 3, -3, 4, -4, 10, -10];
  const shuffledOffsets = shuffleArray(offsets);

  for (let offset of shuffledOffsets) {
    const val = correctAns + offset;
    if (val >= minVal && val <= maxVal && val !== correctAns) {
      optionsSet.add(val);
    }
    if (optionsSet.size === 4) break;
  }

  // Nếu chưa đủ 4 lựa chọn, sinh ngẫu nhiên xung quanh đáp án đúng
  while (optionsSet.size < 4) {
    const offset = getRandomInt(-5, 5);
    const val = correctAns + offset;
    if (val >= minVal && val !== correctAns) {
      optionsSet.add(val);
    }
  }

  return shuffleArray(Array.from(optionsSet));
};

/**
 * Tạo câu hỏi phép nhân
 */
const generateMultiplicationQuestion = () => {
  const a = getRandomInt(2, 9);
  const b = getRandomInt(2, 9);
  const correctAnswer = a * b;

  // Lựa chọn đáp án nhiễu đặc trưng của phép nhân
  const optionsSet = new Set([correctAnswer]);
  
  // Bé hay nhầm phép nhân với phép cộng, hoặc tính lệch 1 đơn vị
  const distractors = [
    a + b,                    // Nhầm nhân thành cộng
    a * (b + 1),              // Lệch 1 thừa số
    (a + 1) * b,
    a * (b - 1),
    (a - 1) * b,
    correctAnswer + 2,
    correctAnswer - 2
  ];

  const shuffledDistractors = shuffleArray(distractors.filter(x => x > 0 && x !== correctAnswer));
  for (let d of shuffledDistractors) {
    optionsSet.add(d);
    if (optionsSet.size === 4) break;
  }

  // Điền thêm nếu thiếu
  while (optionsSet.size < 4) {
    const val = correctAnswer + getRandomInt(-5, 5);
    if (val > 0 && val !== correctAnswer) {
      optionsSet.add(val);
    }
  }

  return {
    type: 'multiplication',
    questionText: `${a} x ${b} = ?`,
    questionSubText: `Bé hãy tính tích của ${a} và ${b} nhé!`,
    correctAnswer,
    options: shuffleArray(Array.from(optionsSet)),
    expression: { a, b, op: 'x' }
  };
};

/**
 * Tạo câu hỏi phép chia
 */
const generateDivisionQuestion = () => {
  const divisor = getRandomInt(2, 9); // Số chia
  const correctAnswer = getRandomInt(2, 9); // Thương (đáp án đúng)
  const dividend = divisor * correctAnswer; // Số bị chia

  const optionsSet = new Set([correctAnswer]);
  
  // Bé hay nhầm phép chia với phép trừ, hoặc lệch thương
  const distractors = [
    correctAnswer + 1,
    correctAnswer - 1,
    correctAnswer + 2,
    correctAnswer - 2,
    dividend - divisor, // Nhầm sang phép trừ
    Math.round(dividend / (divisor + 1))
  ];

  const shuffledDistractors = shuffleArray(
    distractors.filter(x => x > 0 && x !== correctAnswer && Number.isInteger(x))
  );

  for (let d of shuffledDistractors) {
    optionsSet.add(d);
    if (optionsSet.size === 4) break;
  }

  while (optionsSet.size < 4) {
    const val = correctAnswer + getRandomInt(-3, 3);
    if (val > 0 && val !== correctAnswer) {
      optionsSet.add(val);
    }
  }

  return {
    type: 'division',
    questionText: `${dividend} : ${divisor} = ?`,
    questionSubText: `Bé hãy chia đều ${dividend} thành ${divisor} phần xem được mấy nhé!`,
    correctAnswer,
    options: shuffleArray(Array.from(optionsSet)),
    expression: { a: dividend, b: divisor, op: ':' }
  };
};

/**
 * Tạo câu hỏi hình học (Chu vi hình vuông, hình chữ nhật, hình tam giác)
 */
const generateGeometryQuestion = () => {
  const shapes = ['square', 'rectangle', 'triangle'];
  const chosenShape = shapes[getRandomInt(0, shapes.length - 1)];

  if (chosenShape === 'square') {
    const side = getRandomInt(2, 10);
    const correctAnswer = side * 4;

    // Bé hay nhầm chu vi với diện tích (s * s) hoặc nhân 2 thay vì nhân 4
    const optionsSet = new Set([correctAnswer]);
    const distractors = [
      side * side, // Diện tích
      side * 2,    // Chỉ nhân 2
      side * 3,    // 3 cạnh
      side + 4,    // Cộng thêm 4
      correctAnswer + 4,
      correctAnswer - 4
    ];

    const shuffledDistractors = shuffleArray(distractors.filter(x => x > 0 && x !== correctAnswer));
    for (let d of shuffledDistractors) {
      optionsSet.add(d);
      if (optionsSet.size === 4) break;
    }

    while (optionsSet.size < 4) {
      optionsSet.add(correctAnswer + getRandomInt(-4, 4));
    }

    return {
      type: 'geometry',
      shape: 'square',
      questionText: 'Tính chu vi Hình Vuông',
      questionSubText: `Hình vuông có cạnh bằng ${side} cm. Chu vi của hình vuông này là bao nhiêu cm?`,
      shapeData: { side },
      correctAnswer,
      options: shuffleArray(Array.from(optionsSet))
    };
  } else if (chosenShape === 'rectangle') {
    const width = getRandomInt(2, 8);
    const height = getRandomInt(width + 1, width + 5); // Đảm bảo dài > rộng
    const correctAnswer = (width + height) * 2;

    // Bé hay nhầm chu vi với diện tích (w * h) hoặc quên nhân 2 (w + h)
    const optionsSet = new Set([correctAnswer]);
    const distractors = [
      width * height,      // Diện tích
      width + height,      // Quên nhân 2
      width * 2 + height,  // Thiếu 1 chiều rộng/dài
      (width + height) * 2 + 2,
      (width + height) * 2 - 2
    ];

    const shuffledDistractors = shuffleArray(distractors.filter(x => x > 0 && x !== correctAnswer));
    for (let d of shuffledDistractors) {
      optionsSet.add(d);
      if (optionsSet.size === 4) break;
    }

    while (optionsSet.size < 4) {
      optionsSet.add(correctAnswer + getRandomInt(-4, 4));
    }

    return {
      type: 'geometry',
      shape: 'rectangle',
      questionText: 'Tính chu vi Hình Chữ Nhật',
      questionSubText: `Hình chữ nhật có chiều dài ${height} cm và chiều rộng ${width} cm. Chu vi là bao nhiêu cm?`,
      shapeData: { width, height },
      correctAnswer,
      options: shuffleArray(Array.from(optionsSet))
    };
  } else {
    // Hình tam giác: random 3 cạnh a, b, c
    let a, b, c;
    // Đảm bảo tạo ra tam giác hợp lệ (a+b>c, a+c>b, b+c>a)
    do {
      a = getRandomInt(3, 9);
      b = getRandomInt(3, 9);
      c = getRandomInt(3, 9);
    } while (!(a + b > c && a + c > b && b + c > a));

    const correctAnswer = a + b + c;

    const optionsSet = new Set([correctAnswer]);
    const distractors = [
      a * b + c, // Tính toán nhầm lẫn
      a + b + c + 2,
      a + b + c - 2,
      a + b,     // Cộng thiếu 1 cạnh
      correctAnswer + 3,
      correctAnswer - 3
    ];

    const shuffledDistractors = shuffleArray(distractors.filter(x => x > 0 && x !== correctAnswer));
    for (let d of shuffledDistractors) {
      optionsSet.add(d);
      if (optionsSet.size === 4) break;
    }

    while (optionsSet.size < 4) {
      optionsSet.add(correctAnswer + getRandomInt(-3, 3));
    }

    return {
      type: 'geometry',
      shape: 'triangle',
      questionText: 'Tính chu vi Hình Tam Giác',
      questionSubText: `Hình tam giác có độ dài 3 cạnh lần lượt là ${a} cm, ${b} cm và ${c} cm. Chu vi là bao nhiêu cm?`,
      shapeData: { a, b, c },
      correctAnswer,
      options: shuffleArray(Array.from(optionsSet))
    };
  }
};

/**
 * Sinh danh sách 10 câu hỏi theo chủ đề được chọn
 * @param {string} subject - 'multiplication' | 'division' | 'geometry'
 * @returns {Array} Mảng gồm 10 câu hỏi
 */
export const generateQuestionSet = (subject) => {
  const questionSet = [];
  for (let i = 0; i < 10; i++) {
    if (subject === 'multiplication') {
      questionSet.push(generateMultiplicationQuestion());
    } else if (subject === 'division') {
      questionSet.push(generateDivisionQuestion());
    } else {
      questionSet.push(generateGeometryQuestion());
    }
  }
  return questionSet;
};
