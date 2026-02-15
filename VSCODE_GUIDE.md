# 💻 VS Code Guide for NEXUS AI

**"im doing this in VS Code"** - Perfect! Here's everything you need to work with NEXUS AI in Visual Studio Code.

---

## 🚀 Quick Start in VS Code

### 1. Open Your Project
```bash
# In VS Code, open the folder
File → Open Folder → Select: nexus-ai folder
```

**Or from terminal:**
```bash
cd nexus-ai
code .
```

---

## 📂 Where Things Are in VS Code

### Your Build Files
In VS Code's Explorer (left sidebar):
```
nexus-ai/
├── dist/                    ← YOUR BUILD IS HERE! 
│   ├── index.html
│   ├── assets/
│   └── images/
├── src/                     ← Source code
│   ├── pages/              ← Landing page, directory, etc.
│   ├── components/         ← UI components
│   ├── data/               ← 60 employees data
│   └── lib/                ← Utilities
├── public/                  ← Static assets
├── package.json            ← Dependencies & scripts
├── .env                    ← Your secrets (DON'T COMMIT!)
└── Documentation files     ← All your guides
```

### To See Your Build:
1. Click **Explorer** icon (top left)
2. Look for **`dist`** folder
3. That's your production build!

---

## 🖥️ Using VS Code Terminal

### Open Terminal (Multiple Ways):
- **Keyboard:** `` Ctrl+` `` (backtick key)
- **Menu:** Terminal → New Terminal
- **Command Palette:** `Ctrl+Shift+P` → "Terminal: Create New Terminal"

### Your Terminal Commands:

#### See Your Build
```bash
# List build files
ls -lah dist/

# See total size
du -sh dist/
```

#### Run Development Server
```bash
# Start the dev server
npm run dev

# Opens at: http://localhost:5173
# Press Ctrl+C to stop
```

#### Build for Production
```bash
# Create production build
npm run build

# Output goes to: dist/
```

#### Preview Production Build
```bash
# Test production build locally
npm run preview

# Opens at: http://localhost:4173
```

#### Deploy to Vercel
```bash
# Install Vercel CLI (one time)
npm install -g vercel

# Deploy!
vercel --prod
```

---

## 🎯 Recommended VS Code Extensions

### Essential for This Project:

1. **ES7+ React/Redux/React-Native snippets**
   - Quick React component creation
   - Install: Extensions → Search "ES7 React"

2. **TypeScript Importer**
   - Auto-import TypeScript modules
   - Install: Extensions → Search "TypeScript Importer"

3. **Tailwind CSS IntelliSense**
   - Autocomplete Tailwind classes
   - Install: Extensions → Search "Tailwind CSS"

4. **Prettier - Code formatter**
   - Auto-format code on save
   - Install: Extensions → Search "Prettier"

5. **ESLint**
   - Catch code errors
   - Install: Extensions → Search "ESLint"

6. **Auto Rename Tag**
   - Rename HTML tags automatically
   - Install: Extensions → Search "Auto Rename Tag"

### How to Install:
1. Click **Extensions** icon (left sidebar)
2. Search extension name
3. Click **Install**
4. Reload if needed

---

## ⌨️ Useful VS Code Shortcuts

### Navigation:
- `Ctrl+P` - Quick file open
- `Ctrl+Shift+P` - Command palette
- `Ctrl+B` - Toggle sidebar
- `Ctrl+\` - Split editor

### Terminal:
- `` Ctrl+` `` - Toggle terminal
- `Ctrl+Shift+` `` - New terminal
- `Ctrl+C` - Stop running process

### Editing:
- `Ctrl+/` - Toggle comment
- `Ctrl+D` - Select next occurrence
- `Alt+Up/Down` - Move line up/down
- `Shift+Alt+Down` - Duplicate line

### Search:
- `Ctrl+F` - Find in file
- `Ctrl+Shift+F` - Find in all files
- `Ctrl+H` - Find and replace

### Save & Format:
- `Ctrl+S` - Save file
- `Shift+Alt+F` - Format document
- `Ctrl+K Ctrl+S` - Save all

---

## 📁 Opening Important Files

### Quick Access in VS Code:

#### Landing Page
```
Press Ctrl+P → Type "LandingPage" → Enter
```
Opens: `src/pages/LandingPage.tsx`

#### Employee Data
```
Press Ctrl+P → Type "complete60" → Enter
```
Opens: `src/data/complete60Employees.ts`

#### Environment Variables
```
Press Ctrl+P → Type ".env" → Enter
```
Opens: `.env` (your secrets)

#### Deployment Guide
```
Press Ctrl+P → Type "DEPLOY_NOW" → Enter
```
Opens: `DEPLOY_NOW.md`

---

## 🚀 Deploy Workflow in VS Code

### Complete Deploy Process:

1. **Open Terminal in VS Code**
   ```
   Ctrl+`
   ```

2. **Make Sure Build is Fresh**
   ```bash
   npm run build
   ```

3. **Install Vercel CLI** (one time only)
   ```bash
   npm install -g vercel
   ```

4. **Deploy!**
   ```bash
   vercel --prod
   ```

5. **Follow Prompts:**
   - Link to existing project? → No
   - Project name? → nexus-ai
   - Directory? → Press Enter (current)
   - Build settings? → Press Enter (defaults)

6. **Get Your URL!**
   ```
   ✔ Production: https://nexus-ai-xxxxx.vercel.app
   ```

7. **Open in Browser:**
   - Click the URL in terminal
   - Or `Ctrl+Click` to open

---

## 🔧 VS Code Settings for This Project

### Recommended Settings:

1. **Open Settings:**
   ```
   Ctrl+, (comma)
   ```

2. **Search and Enable:**
   - "Format on Save" → ✓
   - "Auto Save" → afterDelay
   - "Tab Size" → 2
   - "Trim Trailing Whitespace" → ✓

### Or Edit settings.json:
```
Ctrl+Shift+P → "Preferences: Open Settings (JSON)"
```

Add:
```json
{
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "editor.trimAutoWhitespace": true,
  "files.autoSave": "afterDelay",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
```

---

## 🐛 Debug Configuration

### Running in Debug Mode:

1. **Open Debug Panel:**
   ```
   Ctrl+Shift+D
   ```

2. **Create launch.json:**
   - Click "create a launch.json file"
   - Select "Chrome" or "Edge"

3. **Debug Config:**
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

4. **Start Debugging:**
   - Run `npm run dev` in terminal
   - Press `F5` to start debugger
   - Set breakpoints by clicking line numbers

---

## 📝 Viewing Your Build in VS Code

### Option 1: File Explorer
1. Click **Explorer** (Ctrl+Shift+E)
2. Find `dist/` folder
3. Right-click → "Reveal in File Explorer"

### Option 2: Terminal
```bash
# List all files
ls -lah dist/

# Open folder in file manager
# Mac:
open dist/

# Windows:
explorer dist

# Linux:
xdg-open dist/
```

### Option 3: Preview in Browser
```bash
# Start preview server
npm run preview

# Opens at http://localhost:4173
```

---

## 🎨 Working with the Code

### Edit Landing Page:
1. **Open:** `Ctrl+P` → "LandingPage"
2. **Find hero text:** `Ctrl+F` → "Meet Your AI"
3. **Edit:** Change text
4. **Save:** `Ctrl+S`
5. **See changes:** Check browser (auto-reloads)

### Add New Employee:
1. **Open:** `Ctrl+P` → "complete60Employees"
2. **Scroll to bottom**
3. **Copy existing employee structure**
4. **Modify details**
5. **Save:** `Ctrl+S`

### Change Colors:
1. **Open:** `Ctrl+P` → "index.css"
2. **Find:** `Ctrl+F` → "gradient"
3. **Edit:** Change color codes
4. **Save:** `Ctrl+S`

---

## 🔍 Search Across Project

### Find Anything:

#### Search in Current File
```
Ctrl+F → Type search term
```

#### Search in All Files
```
Ctrl+Shift+F → Type search term
```

#### Find and Replace
```
Ctrl+H → Type find → Type replace → Replace All
```

#### Search Examples:
- Find all prices: `Ctrl+Shift+F` → "$"
- Find components: `Ctrl+Shift+F` → "export default"
- Find imports: `Ctrl+Shift+F` → "import"

---

## 📊 View Build Output

### See What Was Built:

1. **Run Build:**
   ```bash
   npm run build
   ```

2. **Check Terminal Output:**
   - Shows file sizes
   - Shows bundle analysis
   - Shows total build size

3. **View in Explorer:**
   - Click `dist/` folder
   - See all generated files
   - Check `assets/` subfolder

### Example Output:
```
✓ 73 modules transformed.
dist/index.html                   0.87 kB │ gzip:  0.47 kB
dist/assets/index-xxxxx.css     106.34 kB │ gzip: 17.89 kB
dist/assets/index-xxxxx.js      256.31 kB │ gzip: 62.27 kB
✓ built in 4.08s
```

---

## ⚡ Pro Tips for VS Code

### 1. Multi-Cursor Editing
- `Alt+Click` - Add cursor
- `Ctrl+Alt+Down` - Add cursor below
- Edit multiple lines at once!

### 2. Quick File Navigation
- `Ctrl+P` - Type filename (fuzzy search)
- `Ctrl+Tab` - Switch between open files
- `Ctrl+W` - Close current file

### 3. Split View
- `Ctrl+\` - Split editor
- View docs and code side-by-side
- Drag files to different panes

### 4. Zen Mode
- `Ctrl+K Z` - Distraction-free coding
- Press `Esc Esc` to exit

### 5. Git Integration
- Source Control panel (Ctrl+Shift+G)
- See changes
- Commit directly from VS Code

---

## 🎯 Common Tasks in VS Code

### Check if Server is Running:
Look at terminal:
- `VITE vX.X.X ready in XXXms` = Running ✓
- No message = Not running, run `npm run dev`

### Stop Server:
```
Click in terminal → Press Ctrl+C
```

### Restart Server:
```
Ctrl+C → npm run dev
```

### Clear Terminal:
```
Ctrl+K (or type 'clear')
```

### New Terminal Window:
```
Click + icon in terminal panel
Or: Ctrl+Shift+`
```

---

## 📖 Documentation Access in VS Code

### Quick Open Guides:

```
Ctrl+P then type:
→ "DEPLOY_NOW" - Deploy guide
→ "YOUR_NEXT" - Action plan
→ "GET_LIVE" - Launch guide
→ "YOUR_BUILD" - Build location
→ "START_HERE" - Learning path
→ "VSCODE" - This guide!
```

### View Side-by-Side:
1. Open guide: `Ctrl+P` → "DEPLOY_NOW"
2. Split editor: `Ctrl+\`
3. Follow guide in one pane, work in other

---

## 🐛 Troubleshooting in VS Code

### Terminal Not Opening?
- Try: `Ctrl+Shift+` `
- Or: Menu → Terminal → New Terminal

### "npm not found"?
- Node.js not installed
- Close and reopen VS Code
- Restart computer

### "Port 5173 already in use"?
- Previous server still running
- Find terminal with server
- Press `Ctrl+C` to stop it

### Changes Not Showing?
- Check if `npm run dev` is running
- Hard refresh browser: `Ctrl+Shift+R`
- Clear browser cache

### Extension Not Working?
- Reload window: `Ctrl+Shift+P` → "Reload Window"
- Check extension is enabled
- Restart VS Code

---

## 🎉 Complete VS Code Workflow

### From Opening to Deploying:

1. **Open Project**
   ```bash
   code /path/to/nexus-ai
   ```

2. **Open Terminal**
   ```
   Ctrl+`
   ```

3. **Start Dev Server**
   ```bash
   npm run dev
   ```

4. **Make Changes**
   - Edit files in Explorer
   - Save with `Ctrl+S`
   - See updates in browser

5. **Build for Production**
   ```bash
   npm run build
   ```

6. **Preview Build**
   ```bash
   npm run preview
   ```

7. **Deploy**
   ```bash
   vercel --prod
   ```

8. **Success!**
   - Click live URL
   - Share with world
   - Make money! 💰

---

## 💡 Key Takeaways

### You Can Do Everything in VS Code:
- ✅ Write code
- ✅ Run commands
- ✅ Build project
- ✅ Deploy to production
- ✅ Debug issues
- ✅ View files
- ✅ Read documentation

### Essential Commands:
```bash
npm run dev      # Develop
npm run build    # Build
npm run preview  # Test build
vercel --prod    # Deploy
```

### Essential Shortcuts:
```
Ctrl+`          # Terminal
Ctrl+P          # Quick open
Ctrl+S          # Save
Ctrl+Shift+F    # Search all
```

---

## 🚀 Your Next Action

### Right Now in VS Code:

1. **Open Terminal:** `` Ctrl+` ``

2. **Check Your Build:**
   ```bash
   ls -lah dist/
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

4. **Get Rich:** 💰

---

## 📞 Need Help?

### In VS Code:
- `Ctrl+Shift+P` → "Help: Get Started"
- View → Command Palette → Search anything
- Help menu → Keyboard Shortcuts Reference

### For This Project:
- Read: `DEPLOY_NOW.md`
- Read: `YOUR_NEXT_STEPS.md`
- Read: `GET_LIVE_NOW.md`

---

## 🎯 Bottom Line

**You're in VS Code?** Perfect!

- Open terminal: `` Ctrl+` ``
- Run commands: Just type them
- Your build is: `dist/` folder
- Deploy command: `vercel --prod`

**Everything you need is in VS Code. Go make money!** 💰

---

*Happy coding in VS Code! 💻✨*
