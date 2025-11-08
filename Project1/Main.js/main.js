document.addEventListener('DOMContentLoaded', function() {
    initializeShapes();
    
    // Предотвращение масштабирования при двойном тапе на кнопках
    const calcButtons = document.querySelectorAll('.calc-btn');
    calcButtons.forEach(button => {
        button.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Предотвращение выделения текста при долгом нажатии
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
});

// Конфигурация фигур
const shapesConfig = {
    square: {
        id: 'square',
        type: 'square',
        baseSize: 96,
        minSize: 64,
        maxSize: 164,
        color: 'rgba(239, 68, 68, 0.3)'
    },
    circle: {
        id: 'circle',
        type: 'circle',
        baseSize: 90,
        minSize: 60,
        maxSize: 124,
        color: 'rgba(59, 130, 246, 0.3)'
    },
    triangle: {
        id: 'triangle',
        type: 'triangle',
        baseSize: 70,
        minSize: 40,
        maxSize: 100,
        color: 'rgba(147, 51, 234, 0.3)'
    },
    rectangle: {
        id: 'rectangle',
        type: 'rectangle',
        baseWidth: 138,
        baseHeight: 74,
        minWidth: 96,
        minHeight: 48,
        maxWidth: 180,
        maxHeight: 100,
        color: 'rgba(34, 197, 94, 0.3)'
    }
};

// Инициализация начальных позиций
function initializeShapes() {
    Object.values(shapesConfig).forEach(shapeConfig => {
        moveShapeRandom(shapeConfig.id);
    });
}

// Получение случайного размера для фигуры
function getRandomSize(shapeId) {
    const config = shapesConfig[shapeId];
    
    if (shapeId === 'rectangle') {
        const width = Math.floor(Math.random() * (config.maxWidth - config.minWidth) + config.minWidth);
        const height = Math.floor(Math.random() * (config.maxHeight - config.minHeight) + config.minHeight);
        return { width, height };
    } else {
        const size = Math.floor(Math.random() * (config.maxSize - config.minSize) + config.minSize);
        return { size };
    }
}

// Получение случайного поворота для фигуры
function getRandomRotation(shapeId) {
    if (shapeId === 'circle') return 0;
    
    const rotations = [0, 90, 180, 270];
    return rotations[Math.floor(Math.random() * rotations.length)];
}

// Применение трансформации к фигуре
function applyTransformation(shapeId, rotation, size) {
    const shape = document.getElementById(shapeId);
    const config = shapesConfig[shapeId];
    
    let transform = `rotate(${rotation}deg)`;
    let newStyles = {};
    
    if (shapeId === 'rectangle') {
        newStyles.width = `${size.width}px`;
        newStyles.height = `${size.height}px`;
    } else if (shapeId === 'triangle') {
        // Для треугольника меняем размер через border
        const baseSize = size.size / 2;
        shape.style.borderLeftWidth = `${baseSize}px`;
        shape.style.borderRightWidth = `${baseSize}px`;
        shape.style.borderBottomWidth = `${size.size}px`;
        shape.style.borderBottomColor = config.color;
    } else {
        newStyles.width = `${size.size}px`;
        newStyles.height = `${size.size}px`;
    }
    
    shape.style.transform = transform;
    
    // Применяем стили размеров
    Object.keys(newStyles).forEach(key => {
        shape.style[key] = newStyles[key];
    });
}

// Перемещение фигуры в случайное положение с трансформацией
function moveShapeRandom(shapeId) {
    const shape = document.getElementById(shapeId);
    const top = Math.random() * 80 + 10;
    const left = Math.random() * 80 + 10;
    
    const rotation = getRandomRotation(shapeId);
    const size = getRandomSize(shapeId);
    
    shape.style.top = `${top}%`;
    shape.style.left = `${left}%`;
    shape.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
    
    applyTransformation(shapeId, rotation, size);
}

// Перемещение всех фигур в случайные положения
function moveShapesRandom() {
    Object.keys(shapesConfig).forEach(shapeId => {
        moveShapeRandom(shapeId);
    });
}

// Перемещение всех фигур в центр
function moveShapesToCenter() {
    const centerOffset = 50;
    
    Object.keys(shapesConfig).forEach(shapeId => {
        const shape = document.getElementById(shapeId);
        const rotation = getRandomRotation(shapeId);
        const size = getRandomSize(shapeId);
        
        shape.style.top = `${centerOffset}%`;
        shape.style.left = `${centerOffset}%`;
        shape.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        
        applyTransformation(shapeId, rotation, size);
    });
}

// Перемещение фигур в углы (по одной в каждом углу)
function moveShapesToCorners() {
    const corners = [
        { top: '15%', left: '15%' },     // Левый верхний
        { top: '15%', left: '85%' },     // Правый верхний
        { top: '85%', left: '15%' },     // Левый нижний
        { top: '85%', left: '85%' }      // Правый нижний
    ];
    
    const shapeIds = Object.keys(shapesConfig);
    
    // Перемешиваем массив углов
    const shuffledCorners = [...corners].sort(() => Math.random() - 0.5);
    
    shapeIds.forEach((shapeId, index) => {
        const shape = document.getElementById(shapeId);
        const corner = shuffledCorners[index];
        const rotation = getRandomRotation(shapeId);
        const size = getRandomSize(shapeId);
        
        shape.style.top = corner.top;
        shape.style.left = corner.left;
        shape.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        
        applyTransformation(shapeId, rotation, size);
    });
}

// Функции калькулятора
function appendCharacter(char) {
    const result = document.getElementById('result');
    result.value += char;
    // При нажатии любой кнопки - случайное перемещение
    moveShapesRandom();
}

function clearResult() {
    const result = document.getElementById('result');
    result.value = '';
    // При очистке - перемещение в центр
    moveShapesToCenter();
}

function calculateResult() {
    const result = document.getElementById('result');
    try {
        result.value = eval(result.value);
        // При вычислении - перемещение в углы
        moveShapesToCorners();
    } catch (error) {
        result.value = 'Error';
        // При ошибке тоже перемещаем в углы
        moveShapesToCorners();
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializeShapes();
    
    // Добавляем обработчики ко всем кнопкам калькулятора
    const calcButtons = document.querySelectorAll('.calc-btn');
    calcButtons.forEach(button => {
        // Пропускаем кнопки C и =, так как у них своя логика
        if (!button.textContent.includes('C') && !button.textContent.includes('=')) {
            const originalOnclick = button.getAttribute('onclick');
            if (originalOnclick) {
                button.setAttribute('onclick', originalOnclick);
            }
        }
    });
});