import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const cssPath = path.join(rootDir, 'src', 'customview', 'orgflowExplorer.css');
const jsPath = path.join(rootDir, 'src', 'customview', 'orgflowExplorerApp.js');
const distPath = path.join(rootDir, 'dist', 'orgflow-explorer-bundle.js');

const cssContent = fs.readFileSync(cssPath, 'utf-8');
const jsContent = fs.readFileSync(jsPath, 'utf-8');

// Injected CSS logic inside bundle
const injectedCode = `
// Auto-injected OrgFlow Explorer Styles
(function() {
    if (!document.getElementById('orgflow-explorer-styles')) {
        const style = document.createElement('style');
        style.id = 'orgflow-explorer-styles';
        style.textContent = ${JSON.stringify(cssContent)};
        document.head.appendChild(style);
    }
})();

${jsContent}
`;

fs.writeFileSync(distPath, injectedCode, 'utf-8');
console.log(`Bundle generated successfully: ${distPath} (${(fs.statSync(distPath).size / 1024).toFixed(1)} KB)`);
