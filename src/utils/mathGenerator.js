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
 * Tạo câu hỏi quy đổi đơn vị đo (độ dài, khối lượng, diện tích, thể tích, thời gian, hỗn hợp)
 */
const generateConversionQuestion = () => {
  const types = ['length', 'mass', 'area', 'volume', 'time', 'mixed'];
  const chosenType = types[getRandomInt(0, types.length - 1)];

  if (chosenType === 'length') {
    const conversions = [
      { from: 'km', to: 'm', factor: 1000, op: 'multiply' },
      { from: 'm', to: 'cm', factor: 100, op: 'multiply' },
      { from: 'm', to: 'dm', factor: 10, op: 'multiply' },
      { from: 'dm', to: 'cm', factor: 10, op: 'multiply' },
      { from: 'cm', to: 'mm', factor: 10, op: 'multiply' },
      { from: 'm', to: 'mm', factor: 1000, op: 'multiply' },
      { from: 'cm', to: 'm', factor: 100, op: 'divide' },
      { from: 'dm', to: 'm', factor: 10, op: 'divide' },
    ];
    const conv = conversions[getRandomInt(0, conversions.length - 1)];
    let val, correctAnswer;
    if (conv.op === 'multiply') {
      val = getRandomInt(1, 10);
      correctAnswer = val * conv.factor;
    } else {
      val = getRandomInt(1, 10) * conv.factor;
      correctAnswer = val / conv.factor;
    }

    return {
      type: 'conversion',
      questionText: `Đổi Đơn Vị Độ Dài`,
      questionSubText: `Bé hãy điền số thích hợp vào chỗ trống: ${val} ${conv.from} = ... ${conv.to}`,
      correctAnswer,
      options: generateOptions(correctAnswer, 1, correctAnswer * 5)
    };
  } else if (chosenType === 'mass') {
    const conversions = [
      { from: 'tấn', to: 'tạ', factor: 10, op: 'multiply' },
      { from: 'tấn', to: 'kg', factor: 1000, op: 'multiply' },
      { from: 'tạ', to: 'kg', factor: 100, op: 'multiply' },
      { from: 'yến', to: 'kg', factor: 10, op: 'multiply' },
      { from: 'kg', to: 'g', factor: 1000, op: 'multiply' },
      { from: 'kg', to: 'tạ', factor: 100, op: 'divide' },
      { from: 'kg', to: 'tấn', factor: 1000, op: 'divide' }
    ];
    const conv = conversions[getRandomInt(0, conversions.length - 1)];
    let val, correctAnswer;
    if (conv.op === 'multiply') {
      val = getRandomInt(1, 10);
      correctAnswer = val * conv.factor;
    } else {
      val = getRandomInt(1, 10) * conv.factor;
      correctAnswer = val / conv.factor;
    }

    return {
      type: 'conversion',
      questionText: `Đổi Đơn Vị Khối Lượng`,
      questionSubText: `Bé hãy điền số thích hợp vào chỗ trống: ${val} ${conv.from} = ... ${conv.to}`,
      correctAnswer,
      options: generateOptions(correctAnswer, 1, correctAnswer * 5)
    };
  } else if (chosenType === 'area') {
    const conversions = [
      { from: 'm²', to: 'dm²', factor: 100, op: 'multiply' },
      { from: 'dm²', to: 'cm²', factor: 100, op: 'multiply' },
      { from: 'cm²', to: 'mm²', factor: 100, op: 'multiply' },
      { from: 'm²', to: 'cm²', factor: 10000, op: 'multiply' },
      { from: 'dm²', to: 'm²', factor: 100, op: 'divide' },
      { from: 'cm²', to: 'dm²', factor: 100, op: 'divide' }
    ];
    const conv = conversions[getRandomInt(0, conversions.length - 1)];
    let val, correctAnswer;
    if (conv.op === 'multiply') {
      val = getRandomInt(1, 8);
      correctAnswer = val * conv.factor;
    } else {
      val = getRandomInt(1, 8) * conv.factor;
      correctAnswer = val / conv.factor;
    }

    return {
      type: 'conversion',
      questionText: `Đổi Đơn Vị Diện Tích`,
      questionSubText: `Bé hãy điền số thích hợp (chú ý: đơn vị diện tích hơn kém nhau 100 lần): ${val} ${conv.from} = ... ${conv.to}`,
      correctAnswer,
      options: generateOptions(correctAnswer, 1, correctAnswer * 5)
    };
  } else if (chosenType === 'volume') {
    const conversions = [
      { from: 'm³', to: 'dm³', factor: 1000, op: 'multiply' },
      { from: 'dm³', to: 'cm³', factor: 1000, op: 'multiply' },
      { from: 'm³', to: 'lít', factor: 1000, op: 'multiply' },
      { from: 'dm³', to: 'lít', factor: 1, op: 'multiply' },
      { from: 'lít', to: 'cm³', factor: 1000, op: 'multiply' },
      { from: 'dm³', to: 'm³', factor: 1000, op: 'divide' }
    ];
    const conv = conversions[getRandomInt(0, conversions.length - 1)];
    let val, correctAnswer;
    if (conv.op === 'multiply') {
      val = getRandomInt(1, 6);
      correctAnswer = val * conv.factor;
    } else {
      val = getRandomInt(1, 6) * conv.factor;
      correctAnswer = val / conv.factor;
    }

    return {
      type: 'conversion',
      questionText: `Đổi Đơn Vị Thể Tích`,
      questionSubText: `Bé hãy điền số thích hợp (chú ý: 1 dm³ = 1 lít): ${val} ${conv.from} = ... ${conv.to}`,
      correctAnswer,
      options: generateOptions(correctAnswer, 1, correctAnswer * 5)
    };
  } else if (chosenType === 'time') {
    const timeQuestions = [
      { q: '1 giờ 15 phút = ... phút', ans: 75 },
      { q: '1 giờ 30 phút = ... phút', ans: 90 },
      { q: '2 giờ = ... phút', ans: 120 },
      { q: '2 phút 30 giây = ... giây', ans: 150 },
      { q: '3 phút = ... giây', ans: 180 },
      { q: '2 ngày = ... giờ', ans: 48 },
      { q: '3 ngày = ... giờ', ans: 72 },
      { q: '2 thế kỷ = ... năm', ans: 200 },
      { q: '5 thế kỷ = ... năm', ans: 500 },
      { q: '1 năm 6 tháng = ... tháng', ans: 18 }
    ];
    const item = timeQuestions[getRandomInt(0, timeQuestions.length - 1)];
    const correctAnswer = item.ans;

    return {
      type: 'conversion',
      questionText: `Đồng Hồ Kỳ Diệu`,
      questionSubText: `Bé hãy đổi đơn vị thời gian sau: ${item.q}`,
      correctAnswer,
      options: generateOptions(correctAnswer, 1, correctAnswer * 3)
    };
  } else {
    // Thử thách "Cân bằng" (Hỗn hợp)
    const mixedConversions = [
      { q: '2 tấn 5 tạ = ... kg', ans: 2500 },
      { q: '1 tấn 200 kg = ... kg', ans: 1200 },
      { q: '3 tạ 50 kg = ... kg', ans: 350 },
      { q: '3m 4cm = ... cm', ans: 304 },
      { q: '5m 2dm = ... dm', ans: 52 },
      { q: '2dm 5mm = ... mm', ans: 205 },
      { q: '4 kg 200 g = ... g', ans: 4200 },
      { q: '1 kg 50g = ... g', ans: 1050 }
    ];
    const item = mixedConversions[getRandomInt(0, mixedConversions.length - 1)];
    const correctAnswer = item.ans;

    return {
      type: 'conversion',
      questionText: `Thử Thách Cân Bằng`,
      questionSubText: `Bé hãy quy đổi và gộp đơn vị đo sau: ${item.q}`,
      correctAnswer,
      options: generateOptions(correctAnswer, 1, correctAnswer * 3)
    };
  }
};

/**
 * Tạo câu hỏi tính diện tích hình vuông, hình chữ nhật
 */
const generateAreaQuestion = () => {
  const chosenShape = getRandomInt(0, 1) === 0 ? 'square' : 'rectangle';

  if (chosenShape === 'square') {
    const side = getRandomInt(2, 10);
    const correctAnswer = side * side;

    const optionsSet = new Set([correctAnswer]);
    const distractors = [
      side * 4, // Chu vi nhầm lẫn
      side * 2,
      side + side,
      correctAnswer + 5,
      correctAnswer - 5
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
      isArea: true,
      questionText: 'Tính diện tích Hình Vuông',
      questionSubText: `Hình vuông có cạnh bằng ${side} cm. Diện tích của hình vuông này là bao nhiêu cm²?`,
      shapeData: { side },
      correctAnswer,
      options: shuffleArray(Array.from(optionsSet))
    };
  } else {
    const width = getRandomInt(2, 8);
    const height = getRandomInt(width + 1, width + 5);
    const correctAnswer = width * height;

    const optionsSet = new Set([correctAnswer]);
    const distractors = [
      (width + height) * 2, // Chu vi nhầm lẫn
      width + height,
      width * 2 + height,
      correctAnswer + 6,
      correctAnswer - 6
    ];
    const shuffledDistractors = shuffleArray(distractors.filter(x => x > 0 && x !== correctAnswer));
    for (let d of shuffledDistractors) {
      optionsSet.add(d);
      if (optionsSet.size === 4) break;
    }
    while (optionsSet.size < 4) {
      optionsSet.add(correctAnswer + getRandomInt(-5, 5));
    }

    return {
      type: 'geometry',
      shape: 'rectangle',
      isArea: true,
      questionText: 'Tính diện tích Hình Chữ Nhật',
      questionSubText: `Hình chữ nhật có chiều dài ${height} cm và chiều rộng ${width} cm. Diện tích là bao nhiêu cm²?`,
      shapeData: { width, height },
      correctAnswer,
      options: shuffleArray(Array.from(optionsSet))
    };
  }
};

/**
 * Sinh danh sách 10 câu hỏi theo chủ đề được chọn
 * @param {string} subject - 'multiplication' | 'division' | 'geometry' | 'conversion' | 'area'
 * @returns {Array} Mảng gồm 10 câu hỏi
 */
export const generateQuestionSet = (subject) => {
  const questionSet = [];
  for (let i = 0; i < 10; i++) {
    if (subject === 'multiplication') {
      questionSet.push(generateMultiplicationQuestion());
    } else if (subject === 'division') {
      questionSet.push(generateDivisionQuestion());
    } else if (subject === 'conversion') {
      questionSet.push(generateConversionQuestion());
    } else if (subject === 'area') {
      questionSet.push(generateAreaQuestion());
    } else {
      questionSet.push(generateGeometryQuestion());
    }
  }
  return questionSet;
};
