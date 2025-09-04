import { useState, useCallback, useMemo } from 'react';
import { Card } from '@/components/ui/card';

interface RGBColor {
  r: number;
  g: number;
  b: number;
}

const RGBColorDemo = () => {
  const [color, setColor] = useState<RGBColor>({ r: 128, g: 128, b: 128 });

  // Predefined color swatches for the grid
  const colorSwatches: RGBColor[] = [
    { r: 255, g: 0, b: 0 },     // Red
    { r: 0, g: 255, b: 0 },     // Green
    { r: 0, g: 0, b: 255 },     // Blue
    { r: 255, g: 255, b: 0 },   // Yellow
    { r: 255, g: 0, b: 255 },   // Magenta
    { r: 0, g: 255, b: 255 },   // Cyan
    { r: 255, g: 255, b: 255 }, // White
    { r: 0, g: 0, b: 0 },       // Black
    { r: 255, g: 128, b: 0 },   // Orange
    { r: 128, g: 0, b: 128 },   // Purple
    { r: 0, g: 128, b: 0 },     // Dark Green
    { r: 128, g: 128, b: 128 }, // Gray
    { r: 255, g: 192, b: 203 }, // Pink
    { r: 165, g: 42, b: 42 },   // Brown
    { r: 255, g: 165, b: 0 },   // Gold
    { r: 75, g: 0, b: 130 },    // Indigo
  ];

  const handleSliderChange = useCallback((component: 'r' | 'g' | 'b', value: number) => {
    setColor(prev => ({ ...prev, [component]: value }));
  }, []);

  const handleSwatchClick = useCallback((swatchColor: RGBColor) => {
    setColor(swatchColor);
  }, []);

  const currentColorStyle = useMemo(() => ({
    backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`
  }), [color.r, color.g, color.b]);

  const sliderBackgrounds = useMemo(() => ({
    red: `linear-gradient(to right, rgb(0, ${color.g}, ${color.b}), rgb(255, ${color.g}, ${color.b}))`,
    green: `linear-gradient(to right, rgb(${color.r}, 0, ${color.b}), rgb(${color.r}, 255, ${color.b}))`,
    blue: `linear-gradient(to right, rgb(${color.r}, ${color.g}, 0), rgb(${color.r}, ${color.g}, 255))`
  }), [color.r, color.g, color.b]);

  const getSwatchStyle = useCallback((swatchColor: RGBColor) => ({
    backgroundColor: `rgb(${swatchColor.r}, ${swatchColor.g}, ${swatchColor.b})`
  }), []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Main Color Display */}
        <div className="text-center">
          <div 
            className="color-display w-full h-64 mb-4"
            style={currentColorStyle}
          />
          <div className="bg-values-bg border border-values-border rounded-lg px-6 py-3 inline-block">
            <span className="text-lg font-mono text-foreground">
              ({color.r}, {color.g}, {color.b})
            </span>
          </div>
        </div>

        {/* Control Sliders */}
        <Card className="p-8">
          <div className="space-y-8">
            {/* Red Slider */}
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="255"
                value={color.r}
                onInput={(e) => handleSliderChange('r', parseInt((e.target as HTMLInputElement).value))}
                className="rgb-slider w-full"
                style={{
                  background: sliderBackgrounds.red
                }}
              />
            </div>

            {/* Green Slider */}
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="255"
                value={color.g}
                onInput={(e) => handleSliderChange('g', parseInt((e.target as HTMLInputElement).value))}
                className="rgb-slider w-full"
                style={{
                  background: sliderBackgrounds.green
                }}
              />
            </div>

            {/* Blue Slider */}
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="255"
                value={color.b}
                onInput={(e) => handleSliderChange('b', parseInt((e.target as HTMLInputElement).value))}
                className="rgb-slider w-full"
                style={{
                  background: sliderBackgrounds.blue
                }}
              />
            </div>
          </div>
        </Card>

        {/* Color Swatch Grid */}
        <Card className="p-6">
          <div className="grid grid-cols-8 gap-4">
            {colorSwatches.map((swatchColor, index) => (
              <button
                key={index}
                className="color-swatch aspect-square w-full"
                style={getSwatchStyle(swatchColor)}
                onClick={() => handleSwatchClick(swatchColor)}
                aria-label={`Color RGB(${swatchColor.r}, ${swatchColor.g}, ${swatchColor.b})`}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RGBColorDemo;