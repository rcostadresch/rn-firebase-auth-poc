module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: 'react-native-dotenv',
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          assets: './src/assets',
          atoms: './src/components/atoms',
          components: './src/components',
          constants: './src/constants',
          molecules: './src/components/molecules',
          navigations: './src/navigations',
          organisms: './src/components/organisms',
          scenes: './src/scenes',
          styles: './src/styles',
          utils: './src/utils',
          services: './src/services',
          templates: './src/templates',
          hooks: './src/hooks',
          languages: './src/i18n',
          interfaces: './src/interfaces',
          modules: './src/modules',
          store: './src/store',
        },
      },
    ],
  ],
};
