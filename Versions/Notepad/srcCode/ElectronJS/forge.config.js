const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
const path = require('path');
require('dotenv').config();

module.exports = {
  packagerConfig: {
    name: 'SidGautamNotes',
    asar: true,
    icon: 'src/assets/icon',
    appCategoryType: 'public.app-category.developer-tools'
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        iconUrl: 'https://rawcdn.githack.com/GautamBatta73/SidGautam/508166fc8dd4b22225861e19e48e900338533466/Versions/Notepad/srcCode/ElectronJS/src/assets/icon.ico',
        setupIcon: 'src/assets/icon.ico',
        certificateFile: './cert.pfx',
        certificatePassword: process.env.CERTIFICATE_PASSWORD
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        icon: path.join(__dirname, 'src/assets/icon.png'),
        maintainer: 'Gautam Batta',
        homepage: 'https://github.com/GautamBatta73/SidGautam/tree/main/Versions/Notepad'
      },
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
