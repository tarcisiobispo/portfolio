#!/usr/bin/env node

/**
 * Security check script for the portfolio website
 * Performs various security validations before deployment
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔒 Running security checks...\n');

// Check 1: Validate that security utilities are properly imported
function checkSecurityImports() {
  console.log('1. Checking security imports...');

  const securityFile = path.join(__dirname, '../src/utils/security.ts');
  if (!fs.existsSync(securityFile)) {
    console.error('❌ Security utilities file not found!');
    return false;
  }

  const optimizedImageFile = path.join(__dirname, '../src/components/OptimizedImage.tsx');
  if (!fs.existsSync(optimizedImageFile)) {
    console.error('❌ OptimizedImage component not found!');
    return false;
  }

  const content = fs.readFileSync(optimizedImageFile, 'utf8');
  if (!content.includes('validateAndSanitizeUrl')) {
    console.error('❌ OptimizedImage component does not use security validation!');
    return false;
  }

  console.log('✅ Security imports validated');
  return true;
}

// Check 2: Validate Vite configuration security
function checkViteConfig() {
  console.log('2. Checking Vite configuration...');

  const viteConfigFile = path.join(__dirname, '../vite.config.ts');
  if (!fs.existsSync(viteConfigFile)) {
    console.error('❌ Vite config file not found!');
    return false;
  }

  const content = fs.readFileSync(viteConfigFile, 'utf8');

  // Check for security headers
  if (!content.includes('X-Content-Type-Options')) {
    console.error('❌ Missing security headers in Vite config!');
    return false;
  }

  // Check for strict file system access
  if (!content.includes('strict: true')) {
    console.error('❌ File system access not properly restricted!');
    return false;
  }

  console.log('✅ Vite configuration security validated');
  return true;
}

// Check 3: Validate ESLint security rules
function checkESLintConfig() {
  console.log('3. Checking ESLint security rules...');

  const eslintConfigFile = path.join(__dirname, '../eslint.config.js');
  if (!fs.existsSync(eslintConfigFile)) {
    console.error('❌ ESLint config file not found!');
    return false;
  }

  const content = fs.readFileSync(eslintConfigFile, 'utf8');

  // Check for security rules
  const securityRules = ['no-eval', 'no-implied-eval', 'no-new-func', 'no-script-url'];
  const missingRules = securityRules.filter(rule => !content.includes(rule));

  if (missingRules.length > 0) {
    console.error(`❌ Missing security rules: ${missingRules.join(', ')}`);
    return false;
  }

  console.log('✅ ESLint security rules validated');
  return true;
}

// Check 4: Scan for potential security issues in source code
function scanSourceCode() {
  console.log('4. Scanning source code for security issues...');

  const srcDir = path.join(__dirname, '../src');
  const dangerousPatterns = [
    { pattern: /eval\s*\(/, message: 'Found eval() usage' },
    { pattern: /innerHTML\s*=/, message: 'Found innerHTML assignment' },
    { pattern: /document\.write/, message: 'Found document.write usage' },
    { pattern: /\.includes\s*\(\s*['"].*\.com['"]/, message: 'Found unsafe domain check with includes()' }
  ];

  function scanFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];

    dangerousPatterns.forEach(({ pattern, message }) => {
      if (pattern.test(content)) {
        issues.push(`${message} in ${filePath}`);
      }
    });

    return issues;
  }

  function scanDirectory(dir) {
    const issues = [];
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        issues.push(...scanDirectory(filePath));
      } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
        issues.push(...scanFile(filePath));
      }
    });

    return issues;
  }

  const issues = scanDirectory(srcDir);

  if (issues.length > 0) {
    console.error('❌ Security issues found:');
    issues.forEach(issue => console.error(`   ${issue}`));
    return false;
  }

  console.log('✅ Source code security scan completed');
  return true;
}

// Check 5: Validate package.json for known vulnerable packages
function checkPackageJson() {
  console.log('5. Checking package.json for security...');

  const packageJsonFile = path.join(__dirname, '../package.json');
  if (!fs.existsSync(packageJsonFile)) {
    console.error('❌ package.json not found!');
    return false;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonFile, 'utf8'));

  // Check for known vulnerable packages that should be avoided
  const vulnerablePackages = [
    'vite-plugin-imagemin', // Has multiple high-severity vulnerabilities
    'imagemin-webp',       // Vulnerable to ReDoS
    'got'                  // Vulnerable to UNIX socket redirect
  ];

  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies
  };

  const foundVulnerable = vulnerablePackages.filter(pkg => allDeps[pkg]);

  if (foundVulnerable.length > 0) {
    console.error(`❌ Found vulnerable packages: ${foundVulnerable.join(', ')}`);
    return false;
  }

  console.log('✅ Package.json security validated');
  return true;
}

// Run all checks
async function runSecurityChecks() {
  const checks = [
    checkSecurityImports,
    checkViteConfig,
    checkESLintConfig,
    scanSourceCode,
    checkPackageJson
  ];

  let allPassed = true;

  for (const check of checks) {
    try {
      const result = await check();
      if (!result) {
        allPassed = false;
      }
    } catch (error) {
      console.error(`❌ Error running security check: ${error.message}`);
      allPassed = false;
    }
    console.log('');
  }

  if (allPassed) {
    console.log('🎉 All security checks passed!');
    console.log('✅ Website is ready for secure deployment');
    process.exit(0);
  } else {
    console.log('❌ Security checks failed!');
    console.log('🚨 Please fix the issues above before deploying');
    process.exit(1);
  }
}

// Run the security checks
runSecurityChecks().catch(error => {
  console.error('❌ Fatal error during security checks:', error);
  process.exit(1);
});
