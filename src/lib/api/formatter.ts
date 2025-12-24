import { format } from 'prettier/standalone';
import * as parserBabel from 'prettier/plugins/babel';
import * as parserEstree from 'prettier/plugins/estree';
import * as parserHtml from 'prettier/plugins/html';
import * as parserCss from 'prettier/plugins/postcss';
import * as parserTs from 'prettier/plugins/typescript';

export type SupportedLanguage = 'javascript' | 'typescript' | 'html' | 'css' | 'json';

export const formatCode = async (code: string, language: string): Promise<string> => {
    let parser = 'babel';
    let plugins = [parserBabel, parserEstree];

    switch (language) {
        case 'typescript':
        case 'javascript':
        case 'jsx':
        case 'tsx':
            parser = 'typescript';
            plugins = [parserBabel, parserEstree, parserTs];
            break;
        case 'json':
            parser = 'json';
            plugins = [parserBabel, parserEstree];
            break;
        case 'css':
        case 'scss':
        case 'less':
            parser = 'css';
            plugins = [parserCss];
            break;
        case 'html':
            parser = 'html';
            plugins = [parserHtml];
            break;
        default:
            // Fallback or return original if language not supported for formatting
            return code;
    }

    try {
        return await format(code, {
            parser,
            plugins,
            printWidth: 80,
            tabWidth: 2,
            semi: true,
            singleQuote: true,
        });
    } catch (error) {
        console.error('Formatting failed:', error);
        return code;
    }
};