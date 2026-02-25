#!/usr/bin/env python3
"""
Простой скрипт для генерации иконок PWA
Требуется библиотека Pillow: pip install Pillow
"""

try:
    from PIL import Image, ImageDraw, ImageFont
    import os
    
    def create_icon(size, filename):
        # Создаем изображение с градиентом
        img = Image.new('RGB', (size, size), color='#667eea')
        draw = ImageDraw.Draw(img)
        
        # Рисуем градиент (упрощенный)
        for i in range(size):
            ratio = i / size
            r = int(102 + (118 - 102) * ratio)  # 667eea -> 764ba2
            g = int(126 + (75 - 126) * ratio)
            b = int(234 + (162 - 234) * ratio)
            draw.rectangle([(0, i), (size, i+1)], fill=(r, g, b))
        
        # Белый круг
        margin = int(size * 0.15)
        draw.ellipse([margin, margin, size-margin, size-margin], fill='white')
        
        # Музыкальная нота (символ)
        try:
            # Пытаемся использовать системный шрифт
            font_size = int(size * 0.4)
            try:
                font = ImageFont.truetype("arial.ttf", font_size)
            except:
                try:
                    font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
                except:
                    font = ImageFont.load_default()
        except:
            font = ImageFont.load_default()
        
        # Рисуем музыкальный символ
        text = "♫"
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        position = ((size - text_width) // 2, (size - text_height) // 2 - bbox[1])
        draw.text(position, text, fill='#667eea', font=font)
        
        # Сохраняем
        img.save(filename, 'PNG')
        print(f"[OK] Создана иконка: {filename} ({size}x{size})")
    
    # Создаем иконки
    create_icon(192, 'icon-192.png')
    create_icon(512, 'icon-512.png')
    print("\n[OK] Все иконки успешно созданы!")
    
except ImportError:
    print("Ошибка: требуется библиотека Pillow")
    print("Установите её командой: pip install Pillow")
    print("\nИли используйте generate-icons.html в браузере")
except Exception as e:
    print(f"Ошибка: {e}")
    print("\nИспользуйте generate-icons.html в браузере")
