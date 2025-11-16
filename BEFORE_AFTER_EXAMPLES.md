# Before & After: CSS to Tailwind Migration Examples

## Example 1: Button Components

### Before (CSS)
```css
/* Old CSS */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  gap: 8px;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.btn-secondary {
  background: #e2e8f0;
  color: #4a5568;
}
```

```jsx
// Old JSX
<button className="btn btn-primary">Click Me</button>
```

### After (Tailwind)
```jsx
// New JSX - All styling in className
<button className="inline-flex items-center justify-center px-6 py-3 
                   border-0 rounded-lg text-base font-semibold no-underline 
                   cursor-pointer transition-all duration-300 gap-2 
                   bg-gradient-to-br from-primary-500 to-primary-700 text-white
                   hover:-translate-y-0.5 hover:shadow-xl">
  Click Me
</button>
```

Or using @layer components (in App.css):
```css
@layer components {
  .btn {
    @apply inline-flex items-center justify-center px-6 py-3 border-0 
           rounded-lg text-base font-semibold no-underline cursor-pointer 
           transition-all duration-300 gap-2;
  }

  .btn-primary {
    @apply bg-gradient-to-br from-primary-500 to-primary-700 text-white;
  }

  .btn-primary:hover {
    @apply -translate-y-0.5 shadow-xl;
  }

  .btn-secondary {
    @apply bg-secondary-100 text-secondary-500;
  }

  .btn-secondary:hover {
    @apply bg-secondary-200;
  }
}
```

```jsx
// Then JSX becomes cleaner
<button className="btn btn-primary">Click Me</button>
```

---

## Example 2: Hero Section

### Before (CSS)
```css
/* Home.css */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.hero-text h1 {
  font-size: 3rem;
  color: white;
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-image img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .hero-text h1 {
    font-size: 2.5rem;
  }
}
```

```jsx
// Old JSX
<section className="hero-section">
  <div className="hero-content">
    <div className="hero-text">
      <h1>Title</h1>
      <p className="hero-subtitle">Subtitle</p>
    </div>
    <div className="hero-image">
      <img src="..." alt="..." />
    </div>
  </div>
</section>
```

### After (Tailwind)
```jsx
// New JSX - No separate CSS file needed
<section className="bg-gradient-to-br from-primary-500 to-primary-700 
                     text-white py-16">
  <div className="container">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <h1 className="text-5xl md:text-5xl font-bold text-white mb-6">
          Title
        </h1>
        <p className="text-xl md:text-base opacity-90 mb-8">
          Subtitle
        </p>
      </div>
      <div>
        <img 
          src="..." 
          alt="..." 
          className="w-full rounded-2xl shadow-2xl"
        />
      </div>
    </div>
  </div>
</section>
```

---

## Example 3: Feature Cards Grid

### Before (CSS)
```css
/* Home.css */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
  border-radius: 12px;
  background: #f8f9fa;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  margin-bottom: 1rem;
}
```

```jsx
// Old JSX
<div className="features-grid">
  {features.map(feature => (
    <div key={feature.id} className="feature-card">
      <div className="feature-icon">{feature.icon}</div>
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </div>
  ))}
</div>
```

### After (Tailwind)
```jsx
// New JSX - All styling in single className
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {features.map(feature => (
    <div 
      key={feature.id}
      className="text-center p-8 rounded-2xl bg-bg-light 
                 hover:shadow-lg transition-all duration-300 
                 hover:-translate-y-1"
    >
      <div className="text-5xl mb-4">{feature.icon}</div>
      <h3 className="text-xl font-semibold mb-4 text-text-primary">
        {feature.title}
      </h3>
      <p className="text-text-secondary">
        {feature.description}
      </p>
    </div>
  ))}
</div>
```

---

## Example 4: Form Inputs

### Before (CSS)
```css
/* App.css */
.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #4a5568;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
}
```

```jsx
// Old JSX
<div className="form-group">
  <label>Email</label>
  <input type="email" required />
</div>
```

### After (Tailwind)
```jsx
// New JSX - Styles explicitly in JSX
<div className="form-group">
  <label className="block mb-2 text-text-secondary font-medium">
    Email
  </label>
  <input
    type="email"
    className="w-full px-3 py-3 border-2 border-secondary-100 rounded-lg 
               text-base transition-all duration-300 
               focus:outline-none focus:border-primary-500"
    required
  />
</div>
```

Or in @layer components (App.css):
```css
@layer components {
  .form-group {
    @apply mb-6;
  }

  .form-group label {
    @apply block mb-2 text-text-secondary font-medium;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    @apply w-full px-3 py-3 border-2 border-secondary-100 rounded-lg 
           text-base transition-all duration-300;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    @apply outline-none border-primary-500;
  }
}
```

```jsx
// Then JSX stays cleaner
<div className="form-group">
  <label>Email</label>
  <input type="email" required />
</div>
```

---

## Example 5: Table with Hover States

### Before (CSS)
```css
/* Admin.css */
.table-container {
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th,
table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

table th {
  background-color: #f7fafc;
  font-weight: 600;
  color: #4a5568;
}

table tbody tr:hover {
  background-color: #f7fafc;
}
```

```jsx
// Old JSX
<div className="table-container">
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      {items.map(item => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.email}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

### After (Tailwind)
```jsx
// New JSX - All styling in classes
<div className="bg-white rounded-2xl border-2 border-secondary-100 
                shadow-md overflow-hidden">
  <table className="w-full border-collapse">
    <thead className="bg-secondary-50">
      <tr>
        <th className="px-6 py-4 text-left font-semibold text-text-secondary 
                       text-sm uppercase">
          Name
        </th>
        <th className="px-6 py-4 text-left font-semibold text-text-secondary 
                       text-sm uppercase">
          Email
        </th>
      </tr>
    </thead>
    <tbody>
      {items.map(item => (
        <tr key={item.id} className="border-b border-secondary-100 
                                     hover:bg-secondary-50 transition-colors">
          <td className="px-6 py-4 text-text-primary">{item.name}</td>
          <td className="px-6 py-4 text-text-secondary">{item.email}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

---

## Example 6: Responsive Navigation

### Before (CSS)
```css
/* Header.css - Partial */
header {
  background: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

nav a {
  text-decoration: none;
  color: #4a5568;
  font-weight: 500;
}

@media (max-width: 768px) {
  nav {
    display: none;
  }
  .mobile-menu {
    display: flex;
  }
}
```

### After (Tailwind)
```jsx
// New JSX - Responsive classes built-in
<header className="fixed top-0 w-full bg-white shadow-md z-50">
  <div className="container py-4">
    <div className="flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="flex items-center no-underline font-bold text-xl">
        🌾
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6 items-center">
        <Link to="/" className="no-underline text-text-secondary 
                               hover:text-primary-500 transition-colors">
          Home
        </Link>
        {/* More links... */}
      </nav>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-2xl text-text-primary 
                         hover:text-primary-500 transition-colors">
        ☰
      </button>
    </div>

    {/* Mobile Navigation */}
    {menuOpen && (
      <nav className="md:hidden pb-4 border-t border-secondary-100 
                      flex flex-col gap-3">
        {/* Mobile menu items... */}
      </nav>
    )}
  </div>
</header>
```

---

## Example 7: Status Badges

### Before (CSS)
```css
/* Multiple CSS classes */
.role-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.role-admin {
  background-color: #fef3c7;
  color: #92400e;
}

.role-farmer {
  background-color: #d1fae5;
  color: #065f46;
}

.status-active {
  background-color: #dcfce7;
  color: #166534;
}

.status-pending {
  background-color: #fefcbf;
  color: #744210;
}
```

```jsx
// Old JSX
<span className={`role-badge role-${user.role}`}>
  {user.role}
</span>
```

### After (Tailwind)
```jsx
// New JSX - Conditional Tailwind classes
<span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
  user.role === 'admin' ? 'bg-yellow-100 text-yellow-800' :
  user.role === 'farmer' ? 'bg-green-100 text-green-800' :
  'bg-blue-100 text-blue-800'
}`}>
  {user.role}
</span>

{/* Status badges */}
<span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
  store.status === 'active' ? 'bg-green-100 text-green-800' :
  store.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
  'bg-red-100 text-red-800'
}`}>
  {store.status}
</span>
```

---

## Key Differences Summary

| Aspect | Before (CSS) | After (Tailwind) |
|--------|------------|-----------------|
| **Organization** | Separate CSS files | Inline classes in JSX |
| **Flexibility** | Fixed styling | Utility-based, easy to modify |
| **Maintenance** | Update CSS files | Update JSX classes |
| **Responsive** | Media queries in CSS | Built-in md:, lg: prefixes |
| **Colors** | HEX values in CSS | Theme-defined custom colors |
| **Consistency** | Manual enforcement | Enforced by config |
| **File Count** | 11+ CSS files | 2 core files (index.css, App.css) |
| **Customization** | Edit CSS directly | Edit tailwind.config.js |
| **Purging** | Unused styles included | Unused styles removed in build |
| **Development Speed** | Slower (CSS ↔ JSX switching) | Faster (all in JSX/config) |

---

## Learning Path

1. **Start Here**: Read `TAILWIND_QUICK_REFERENCE.md`
2. **Understand**: Review these before/after examples
3. **Practice**: Modify one component to practice Tailwind syntax
4. **Extend**: Check `TAILWIND_MIGRATION_SUMMARY.md` for details
5. **Reference**: Use `tailwindcss.com` official docs

