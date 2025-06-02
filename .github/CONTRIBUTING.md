# Contributing to Archibald

Thank you for your interest in contributing to Archibald! This document outlines the guidelines and rules for contributing to this project.

## Development Guidelines

### Code Style and Standards

1. **TypeScript**
   - Use TypeScript for all new code
   - Maintain strict type safety (no `any` types unless absolutely necessary)
   - Use interface over type when possible
   - Document complex types

2. **React Components**
   - Use functional components with hooks
   - Implement proper prop types
   - Keep components focused and single-responsibility
   - Use Chakra UI components when possible
   - Document component props

3. **State Management**
   - Use Zustand for global state
   - Keep state slices modular and focused
   - Document state shapes and mutations
   - Avoid prop drilling

### File Structure

1. **Component Organization**
   ```
   components/
   ├── common/          # Reusable components
   ├── features/        # Feature-specific components
   ├── layout/         # Layout components
   └── [feature]/      # Feature-specific folders
   ```

2. **Naming Conventions**
   - Components: PascalCase (e.g., `CloudNode.tsx`)
   - Utilities: camelCase (e.g., `formatNodeData.ts`)
   - Test files: `*.test.ts` or `*.test.tsx`
   - Style files: `*.styles.ts`

### Testing

1. **Unit Tests**
   - Required for all new components
   - Required for utility functions
   - Must cover edge cases
   - Use React Testing Library

2. **Integration Tests**
   - Required for feature workflows
   - Test component interactions
   - Test state management

### Documentation

1. **Code Comments**
   - Document complex logic
   - Explain non-obvious implementations
   - Use JSDoc for function documentation

2. **README Updates**
   - Required for new features
   - Include usage examples
   - Update dependencies list if changed

### Git Workflow

1. **Branches**
   - Feature branches: `feature/description`
   - Bug fixes: `fix/description`
   - Documentation: `docs/description`

2. **Commits**
   - Use conventional commits format
   - Keep commits focused and atomic
   - Include ticket/issue reference

3. **Pull Requests**
   - Require review before merge
   - Must pass all tests
   - Must pass linting
   - Include description of changes

### Performance

1. **Bundle Size**
   - Monitor bundle size impacts
   - Use code splitting where appropriate
   - Optimize imports

2. **Rendering**
   - Avoid unnecessary re-renders
   - Use memoization appropriately
   - Monitor performance impacts

### Security

1. **Dependencies**
   - Keep dependencies updated
   - Review security advisories
   - Avoid adding unnecessary dependencies

2. **Code Security**
   - No hardcoded secrets
   - Validate all inputs
   - Follow security best practices

## Getting Help

If you need help or have questions:
1. Check existing documentation
2. Search closed issues
3. Open a new issue with the 'question' label

## License

By contributing to Archibald, you agree that your contributions will be licensed under the MIT License. 
