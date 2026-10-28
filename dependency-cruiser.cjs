/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-circular-dependencies',
      severity: 'error',
      comment: 'Circular dependencies make the codebase harder to maintain.',
      from: {},
      to: {
        circular: true,
      },
    },
    {
      name: 'no-feature-to-app-dependencies',
      severity: 'error',
      comment:
        'Features and shared modules must not depend on Next.js route implementations.',
      from: {
        path: '^src/(?:features|components|lib|types)/',
      },
      to: {
        path: '^src/app/',
      },
    },
    {
      name: 'no-shared-to-feature-dependencies',
      severity: 'error',
      comment:
        'Shared modules must not depend on feature-specific implementations.',
      from: {
        path: '^src/(?:components|lib|types)/',
      },
      to: {
        path: '^src/features/',
      },
    },
  ],

  options: {
    doNotFollow: {
      path: 'node_modules',
    },

    exclude: {
      path: '(^|/)(\\.next|out|build|dist|coverage|playwright-report|test-results)(/|$)',
    },

    tsConfig: {
      fileName: 'tsconfig.json',
    },

    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default'],
    },

    reporterOptions: {
      dot: {
        collapsePattern: 'node_modules/[^/]+',
      },
    },
  },
};
