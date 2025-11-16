# Tailwind CSS Quick Reference Guide

## Color Variables Reference

### Primary Colors
```
primary-50: #f3f4ff
primary-500: #667eea (Main)
primary-700: #764ba2 (Gradient End)
```

### Secondary Colors (Gray Scale)
```
secondary-50: #f7f8fb (Lightest)
secondary-100: #e2e8f0
secondary-200: #cbd5e0
secondary-500: #4a5568
secondary-600: #2d3748 (Dark)
```

### Accent Colors
```
accent-green: #38a169
accent-red: #dc3545
accent-yellow: #fbbf24
accent-blue: #1a5f7a
```

### Text Colors
```
text-primary: #2d3748
text-secondary: #4a5568
text-tertiary: #718096
```

### Background Colors
```
bg-light: #f8f9fa
bg-lighter: #edf2f7
bg-white: #ffffff
```

---

## Common Patterns

### Hero Section
```jsx
<section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-16">
  <div className="container">
    <h1 className="text-5xl font-bold mb-6">Title</h1>
    <p className="text-xl opacity-90 mb-8">Description</p>
  </div>
</section>
```

### Card Component
```jsx
<div className="bg-white rounded-2xl p-6 shadow-md border-2 border-secondary-100 hover:shadow-lg transition-shadow">
  <h3 className="text-xl font-bold text-text-primary mb-4">Title</h3>
  <p className="text-text-secondary">Content</p>
</div>
```

### Button Group
```jsx
<div className="flex flex-col md:flex-row gap-4">
  <button className="btn btn-primary px-6 py-3">Primary</button>
  <button className="btn btn-secondary px-6 py-3">Secondary</button>
</div>
```

### Form with Validation
```jsx
<div className="form-group">
  <label className="block mb-2 text-text-secondary font-medium">Email</label>
  <input
    type="email"
    className="w-full px-4 py-3 border-2 border-secondary-100 rounded-lg 
               focus:outline-none focus:border-primary-500 transition-colors"
    required
  />
  {error && <p className="text-accent-red text-sm mt-2">{error}</p>}
</div>
```

### Grid Layout
```jsx
{/* Responsive 1→2→3 columns */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <Card key={item.id} {...item} />
  ))}
</div>
```

### Table with Hover
```jsx
<table className="w-full border-collapse">
  <thead className="bg-secondary-50">
    <tr>
      <th className="px-6 py-4 text-left font-semibold text-text-secondary 
                     text-sm uppercase">Header</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-secondary-100 hover:bg-secondary-50 
                   transition-colors">
      <td className="px-6 py-4 text-text-primary">Cell</td>
    </tr>
  </tbody>
</table>
```

### Status Badge
```jsx
{/* Green - Success */}
<span className="inline-block px-3 py-1 rounded-full text-sm font-semibold
                 bg-green-100 text-green-800">Active</span>

{/* Yellow - Warning */}
<span className="inline-block px-3 py-1 rounded-full text-sm font-semibold
                 bg-yellow-100 text-yellow-800">Pending</span>

{/* Red - Danger */}
<span className="inline-block px-3 py-1 rounded-full text-sm font-semibold
                 bg-red-100 text-red-800">Inactive</span>
```

### Navigation Links with Active State
```jsx
<Link
  to="/path"
  className={`no-underline font-medium transition-colors ${
    isActive ? 'text-primary-500' : 'text-text-secondary hover:text-primary-500'
  }`}
>
  Link Text
</Link>
```

### Loading Spinner
```jsx
<div className="loading-spinner" />
{/* Configured in App.css with animate-spin */}
```

### Mobile Menu Toggle
```jsx
<button
  onClick={() => setMenuOpen(!menuOpen)}
  className="text-2xl text-text-primary hover:text-primary-500 transition-colors 
             md:hidden"
>
  {menuOpen ? '✕' : '☰'}
</button>
```

---

## Tailwind Utilities Quick Reference

### Display & Layout
```
flex, flex-col, grid, grid-cols-1, grid-cols-2, grid-cols-3
gap-4, gap-6, gap-8
w-full, w-1/2, w-1/3, h-screen, h-96
max-w-container (1200px)
```

### Spacing
```
p-6 (padding: 1.5rem)
m-4 (margin: 1rem)
mx-auto (margin: 0 auto)
px-6 py-4 (padding-x and padding-y)
mt-8, mb-4, ml-2, mr-3
```

### Text
```
text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl, text-5xl
font-light, font-normal, font-semibold, font-bold
text-text-primary, text-text-secondary
text-white, text-center, text-left, text-right
no-underline
```

### Colors
```
bg-white, bg-primary-500, bg-secondary-100
text-primary-500, text-accent-green
border-secondary-100, border-primary-500
```

### Borders & Shadows
```
border-2, border border-l-4 (left border)
rounded-lg, rounded-2xl, rounded-full
shadow-md, shadow-lg, shadow-2xl
```

### Hover & Transitions
```
hover:bg-secondary-200
hover:shadow-lg
hover:text-primary-500
hover:-translate-y-1 (lift effect)
transition-colors, transition-all
duration-300 (animation duration)
```

### Responsive
```
md:grid-cols-2 (medium screens and up)
lg:grid-cols-3 (large screens and up)
hidden md:inline (hide on mobile, show on tablet+)
hidden sm:block (hide on xs, show on sm+)
```

### Visibility
```
hidden, visible
opacity-50, opacity-75, opacity-90
```

---

## Configuration Reference

### Available Theme Values

**Spacing**: 0, 0.5, 1, 1.5, 2, 2.5, 3... 96
**Font Sizes**: xs, sm, base, lg, xl, 2xl, 3xl, 4xl
**Border Radius**: sm, md, lg, full (also: 4, 8, 12)
**Box Shadows**: sm, md, lg, xl, 2xl, 3xl
**Colors**: 50-900 scale for primary/secondary, or direct values
**Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)

---

## Common Mistakes to Avoid

❌ Using old CSS class names like `.card-container`
✅ Use semantic Tailwind classes like `bg-white rounded-2xl p-6`

❌ Inline styles for color
✅ Use theme colors: `text-primary-500` instead of `style={{ color: '#667eea' }}`

❌ Custom arbitrary values
✅ Use predefined values from theme or add to tailwind.config.js

❌ Complex CSS selectors
✅ Use Tailwind's responsive and state variants: `md:`, `hover:`, `focus:`

---

## Adding to App.css (Component Layer)

For complex patterns, add to the `@layer components` section:

```css
@layer components {
  .card {
    @apply bg-white rounded-2xl p-6 shadow-md border-2 border-secondary-100;
  }

  .card:hover {
    @apply shadow-lg transition-shadow duration-300;
  }
}
```

Then use in JSX:
```jsx
<div className="card">Content</div>
```

---

## Extending the Theme

Edit `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'custom-color': '#hexvalue',
      },
      spacing: {
        'custom-size': '10rem',
      },
    },
  },
}
```

---

## Utilities for Every Component Type

### Buttons
```jsx
className="btn btn-primary px-6 py-3"
className="btn btn-secondary"
className="btn btn-small"
className="btn btn-large"
```

### Forms
```jsx
className="form-group"
className="w-full px-4 py-3 border-2 border-secondary-100 rounded-lg 
           focus:outline-none focus:border-primary-500"
```

### Layout
```jsx
className="container" // 1200px max-width with auto margins
className="main-content" // flex-1 with pt-20 for header
```

---

## Performance Tips

1. Never use arbitrary values in loops - extract to array
2. Use responsive variants efficiently: `md:`, `lg:` only when needed
3. Leverage @layer components for reusable patterns
4. Keep selector specificity low
5. Avoid deep nesting in JSX classes

---

## Resources

- Tailwind CSS Docs: https://tailwindcss.com/docs
- Config Reference: https://tailwindcss.com/docs/configuration
- Custom Theme: https://tailwindcss.com/docs/customization/configuration

