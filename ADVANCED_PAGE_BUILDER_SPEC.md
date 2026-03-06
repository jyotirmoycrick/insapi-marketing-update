# Advanced Page Builder - Complete Specification

## Immediate Fix Applied ✅

### Backspace Key Issue - FIXED
**Problem**: Backspace key was deleting elements while editing text
**Solution**: Modified keyboard handler to:
- Only trigger Delete key (not Backspace) for deleting elements
- Check if user is typing in input/textarea/contentEditable
- Don't interfere with text editing

**Code Change**:
```typescript
const isEditing = target.tagName === 'INPUT' || 
                 target.tagName === 'TEXTAREA' || 
                 target.isContentEditable;

if (isEditing) return; // Don't interfere with text editing

// Only Delete key deletes components (not Backspace)
if (e.key === 'Delete') {
  e.preventDefault();
  deleteComponent(selectedComponent.id);
}
```

Now users can:
- ✅ Use Backspace freely when editing text
- ✅ Use Delete key to remove elements
- ✅ Use Delete button in toolbar

---

## Advanced Controls Implementation Plan

This is a comprehensive specification for implementing Elementor-style controls. Due to the complexity, this should be implemented in phases.

### Phase 1: Layout Controls (Priority: HIGH)

#### 1.1 Width & Height Controls
```typescript
interface LayoutControls {
  width: {
    value: number;
    unit: 'px' | '%' | 'vw' | 'auto';
  };
  height: {
    value: number;
    unit: 'px' | '%' | 'vh' | 'auto';
  };
  minHeight: number;
  maxHeight: number;
}
```

**UI Components**:
- Slider with numeric input
- Unit selector dropdown
- Range: 0-2000px or 0-100%

#### 1.2 Flexbox Controls
```typescript
interface FlexControls {
  flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  gap: number;
  flexWrap: 'nowrap' | 'wrap' | 'wrap-reverse';
}
```

**UI Components**:
- Icon buttons for direction
- Icon buttons for alignment
- Slider for gap (0-100px)

#### 1.3 Grid Controls
```typescript
interface GridControls {
  gridTemplateColumns: string; // e.g., "repeat(3, 1fr)"
  gridTemplateRows: string;
  gap: number;
  columnGap: number;
  rowGap: number;
}
```

### Phase 2: Spacing Controls (Priority: HIGH)

#### 2.1 Box Model UI
```typescript
interface SpacingControls {
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
    linked: boolean;
  };
  padding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
    linked: boolean;
  };
}
```

**UI Layout**:
```
       Margin
    ┌─────────┐
    │   20    │
┌───┼─────────┼───┐
│10 │ Padding │10 │
│   │  ┌───┐  │   │
│   │  │ E │  │   │
│   │  └───┘  │   │
└───┼─────────┼───┘
    │   20    │
    └─────────┘
```

**Features**:
- Link/unlink button
- Individual value inputs
- Visual box model representation

### Phase 3: Position Controls (Priority: MEDIUM)

```typescript
interface PositionControls {
  position: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  top: string;
  right: string;
  bottom: string;
  left: string;
  zIndex: number;
}
```

**UI**:
- Dropdown for position type
- Numeric inputs for offsets (show only when absolute/fixed)
- Z-index slider (0-100)

### Phase 4: Background Controls (Priority: HIGH)

#### 4.1 Background Types
```typescript
interface BackgroundControls {
  type: 'classic' | 'gradient' | 'image' | 'video';
  classic: {
    color: string;
  };
  gradient: {
    type: 'linear' | 'radial';
    angle: number;
    colors: Array<{ color: string; position: number }>;
  };
  image: {
    url: string;
    position: string;
    size: 'auto' | 'cover' | 'contain';
    repeat: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y';
    attachment: 'scroll' | 'fixed';
  };
  video: {
    url: string;
    startTime: number;
    endTime: number;
  };
  overlay: {
    enabled: boolean;
    color: string;
    opacity: number;
    blendMode: string;
  };
}
```

**UI**:
- Tab switcher for type
- Color picker
- Image uploader
- Video URL input
- Overlay controls

### Phase 5: Border Controls (Priority: MEDIUM)

```typescript
interface BorderControls {
  type: 'none' | 'solid' | 'dashed' | 'dotted' | 'double';
  width: {
    top: number;
    right: number;
    bottom: number;
    left: number;
    linked: boolean;
  };
  color: string;
  radius: {
    topLeft: number;
    topRight: number;
    bottomRight: number;
    bottomLeft: number;
    linked: boolean;
  };
}
```

### Phase 6: Shadow Controls (Priority: MEDIUM)

```typescript
interface ShadowControls {
  boxShadow: {
    horizontal: number;
    vertical: number;
    blur: number;
    spread: number;
    color: string;
    inset: boolean;
  };
  textShadow: {
    horizontal: number;
    vertical: number;
    blur: number;
    color: string;
  };
}
```

### Phase 7: Typography Controls (Priority: HIGH)

```typescript
interface TypographyControls {
  fontFamily: string;
  fontSize: {
    value: number;
    unit: 'px' | 'em' | 'rem';
  };
  fontWeight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  fontStyle: 'normal' | 'italic';
  textDecoration: 'none' | 'underline' | 'line-through';
  lineHeight: number;
  letterSpacing: number;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  color: string;
}
```

**UI**:
- Font family dropdown (Google Fonts integration)
- Size slider with unit selector
- Weight dropdown
- Style toggle buttons [B] [I] [U]
- Alignment buttons
- Color picker

### Phase 8: Responsive Controls (Priority: HIGH)

```typescript
interface ResponsiveControls {
  breakpoints: {
    desktop: Record<string, any>;
    tablet: Record<string, any>;
    mobile: Record<string, any>;
  };
  visibility: {
    hideOnDesktop: boolean;
    hideOnTablet: boolean;
    hideOnMobile: boolean;
  };
}
```

**UI**:
- Device switcher: [Desktop] [Tablet] [Mobile]
- Each device has separate settings
- Visibility toggles

### Phase 9: Animation Controls (Priority: MEDIUM)

```typescript
interface AnimationControls {
  entrance: {
    type: 'none' | 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 
          'zoomIn' | 'zoomOut' | 'slideInUp' | 'slideInDown' | 'slideInLeft' | 'slideInRight' |
          'bounce' | 'flip' | 'rotate';
    duration: number; // seconds
    delay: number; // seconds
    iteration: number | 'infinite';
  };
  scrolling: {
    enabled: boolean;
    verticalSpeed: number;
    horizontalSpeed: number;
    opacity: { start: number; end: number };
    scale: { start: number; end: number };
    rotate: { start: number; end: number };
    viewportStart: 'top' | 'center' | 'bottom';
    viewportEnd: 'top' | 'center' | 'bottom';
  };
  hover: {
    enabled: boolean;
    transition: {
      duration: number;
      delay: number;
      timing: 'ease' | 'ease-in' | 'ease-out' | 'linear';
    };
    styles: Record<string, any>;
  };
}
```

### Phase 10: Transform Controls (Priority: LOW)

```typescript
interface TransformControls {
  rotate: number; // degrees
  scale: number;
  skewX: number;
  skewY: number;
  translateX: number;
  translateY: number;
}
```

### Phase 11: Advanced Settings (Priority: MEDIUM)

```typescript
interface AdvancedControls {
  cssId: string;
  cssClasses: string[];
  customCSS: string;
  htmlAttributes: Record<string, string>;
  shapeDivider: {
    top: {
      enabled: boolean;
      shape: string;
      height: number;
      color: string;
      flip: boolean;
    };
    bottom: {
      enabled: boolean;
      shape: string;
      height: number;
      color: string;
      flip: boolean;
    };
  };
  sticky: {
    enabled: boolean;
    position: 'top' | 'bottom';
    offset: number;
  };
  overflow: 'visible' | 'hidden' | 'scroll' | 'auto';
}
```

---

## Implementation Architecture

### Component Structure

```typescript
// Main Page Builder
ElementorPageBuilder
├── Toolbar (top)
├── LeftSidebar
│   ├── WidgetPanel (drag widgets)
│   └── NavigatorPanel (tree view)
├── Canvas (center)
│   └── ComponentRenderer
└── RightSidebar
    ├── LayoutTab
    ├── StyleTab
    ├── AdvancedTab
    └── ResponsiveTab
```

### Control Panel Components

```typescript
// Reusable control components
<SliderControl label="Width" value={width} onChange={setWidth} min={0} max={2000} />
<ColorPicker label="Background" value={color} onChange={setColor} />
<SelectControl label="Position" options={positions} value={position} onChange={setPosition} />
<BoxModelControl margin={margin} padding={padding} onChange={handleSpacingChange} />
<IconButtonGroup options={alignments} value={align} onChange={setAlign} />
<TabControl tabs={['Classic', 'Gradient', 'Image']} active={bgType} onChange={setBgType} />
```

### State Management

```typescript
interface ComponentState {
  id: string;
  type: string;
  props: Record<string, any>;
  styles: {
    layout: LayoutControls;
    spacing: SpacingControls;
    position: PositionControls;
    background: BackgroundControls;
    border: BorderControls;
    shadow: ShadowControls;
    typography: TypographyControls;
    animation: AnimationControls;
    transform: TransformControls;
    advanced: AdvancedControls;
    responsive: ResponsiveControls;
  };
  children?: ComponentState[];
}
```

---

## Implementation Phases

### Phase 1 (Week 1-2): Core Layout & Spacing
- ✅ Fix backspace issue (DONE)
- Layout controls (width, height, flex, grid)
- Spacing controls (margin, padding with box model UI)
- Basic responsive controls

### Phase 2 (Week 3-4): Visual Styling
- Background controls (color, gradient, image)
- Border controls
- Shadow controls
- Typography controls

### Phase 3 (Week 5-6): Advanced Features
- Position controls
- Animation controls
- Transform controls
- Hover states

### Phase 4 (Week 7-8): Polish & Advanced
- Advanced settings (CSS ID, classes, custom CSS)
- Shape dividers
- Sticky elements
- Navigator panel improvements
- Performance optimization

---

## UI/UX Guidelines

### Sidebar Layout
```
┌─────────────────────┐
│ LAYOUT              │
├─────────────────────┤
│ Width  [====●===]   │
│ Height [===●====]   │
│                     │
│ Flex Direction      │
│ [→][↓][←][↑]       │
│                     │
│ Justify [===●===]   │
│ Align   [===●===]   │
├─────────────────────┤
│ SPACING             │
├─────────────────────┤
│   Margin            │
│   ┌─────────┐       │
│   │   20    │       │
│ ┌─┼─────────┼─┐     │
│ │ │ Padding │ │     │
│ └─┼─────────┼─┘     │
│   │   20    │       │
│   └─────────┘       │
├─────────────────────┤
│ BACKGROUND          │
├─────────────────────┤
│ [Classic][Gradient] │
│ Color [●]           │
└─────────────────────┘
```

### Responsive Behavior
- Desktop: Full sidebar (300px)
- Tablet: Collapsible sidebar
- Mobile: Bottom sheet

### Visual Feedback
- Live preview on canvas
- Hover highlights
- Selection outline
- Drag indicators
- Loading states

---

## Technical Considerations

### Performance
- Debounce style updates (300ms)
- Memoize component renders
- Virtual scrolling for long lists
- Lazy load control panels

### Browser Compatibility
- CSS Grid support
- Flexbox support
- CSS Custom Properties
- Modern JavaScript (ES6+)

### Accessibility
- Keyboard navigation
- ARIA labels
- Focus management
- Screen reader support

---

## Testing Checklist

- [ ] Backspace doesn't delete elements while editing text
- [ ] Delete key deletes selected elements
- [ ] All controls update live on canvas
- [ ] Responsive controls work on all devices
- [ ] Animations play correctly
- [ ] Custom CSS applies properly
- [ ] Undo/redo works
- [ ] Save/publish works
- [ ] Performance is acceptable (60fps)

---

## Summary

**Immediate Fix**: ✅ Backspace issue resolved
**Full Implementation**: 8-week project with 4 phases
**Priority**: Layout, Spacing, Background, Typography, Responsive
**Complexity**: High - requires significant development time

This is a complete Elementor-style page builder specification. Implementation should be done incrementally, testing each phase before moving to the next.

Would you like me to start implementing Phase 1 (Layout & Spacing controls)?
