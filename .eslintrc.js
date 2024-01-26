module.exports = {
  root: true,
  extends: [
    require.resolve('@khulnasoft/style-guide/eslint/node'),
    require.resolve('@khulnasoft/style-guide/eslint/typescript'),
    'turbo',
    'prettier',
  ],
  ignorePatterns: ['dist'],
};
