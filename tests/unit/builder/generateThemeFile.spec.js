jest.mock('fs');
jest.mock('../../../builder/saveThemeScssFile', () => jest.fn(() => Promise.resolve()));
jest.mock('theme-builder', () => jest.fn(() => ['scss', 'content']));

const fs = require('fs');
const generateThemeFile = require('../../../builder/generateThemeFile');
const saveThemeScssFile = require('../../../builder/saveThemeScssFile');
const themeBuilder = require('theme-builder');

describe('Builder › generateThemeFile.js', () => {
  beforeEach(() => {
    jest.resetModules();
    fs.readFile = jest.fn((filePath, options, cb) => cb(null, 'fake file content'));
  });

  it('reads the file, calls the theme-builder fand saveThemeScssFile functions', () => {
    const fakeFile = 'fake/file.yml';
    return generateThemeFile(fakeFile)
      .then(() => {
        expect(fs.readFile).toHaveBeenCalled();
        expect(fs.readFile.mock.calls[0][0]).toBe(fakeFile);
        expect(fs.readFile.mock.calls[0][1]).toEqual({ encoding: 'utf-8' });
        expect(fs.readFile.mock.calls[0][2]).toBeInstanceOf(Function);

        expect(themeBuilder).toHaveBeenCalled();
        expect(themeBuilder).toHaveBeenCalledWith('fake file content', 'scss', { prefix: 'tx' });

        expect(saveThemeScssFile).toHaveBeenCalled();
        expect(saveThemeScssFile).toHaveBeenCalledWith('scss\ncontent');
      });
  });
});
