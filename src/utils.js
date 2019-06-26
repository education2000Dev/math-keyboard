let CleanBrackets = (latex,editortype = null) => {
    //szy 190625 logic需要进行数学键盘特殊的字符串处理，所以不能提前转化
    //其他题型不变
    let cleaned_latex = latex;
    switch (editortype){
        case 'logic':
            cleaned_latex = cleaned_latex.replace(/\\left\(/g, '@left1@');
            cleaned_latex = cleaned_latex.replace(/\\left\[/g, '@left2@');
            cleaned_latex = cleaned_latex.replace(/\\left\\{/g, '@left3@');
            cleaned_latex = cleaned_latex.replace(/\\right\)/g, '@right1@');
            cleaned_latex = cleaned_latex.replace(/\\right]/g, '@right2@');
            cleaned_latex = cleaned_latex.replace(/\\right\\}/g, '@right3@');
            CleanBrackets(cleaned_latex);
            cleaned_latex = cleaned_latex.replace(/@left1@/g, '\\left(');
            cleaned_latex = cleaned_latex.replace(/@left2@/g, '\\left[');
            cleaned_latex = cleaned_latex.replace(/@left3@/g, '\\left\\{');
            cleaned_latex = cleaned_latex.replace(/@right1@/g, '\\right)');
            cleaned_latex = cleaned_latex.replace(/@right2@/g, '\\right]');
            cleaned_latex = cleaned_latex.replace(/@right3@/g, '\\right\\}');
            break;
        default:
            cleaned_latex = cleaned_latex.replace(/\\{/g, '{');
            cleaned_latex = cleaned_latex.replace(/\\}/g, '}');
            cleaned_latex = cleaned_latex.replace(/\\%/g, '%');
            cleaned_latex = cleaned_latex.replace(/\\le(?!ft)/g, '\\leq');
            cleaned_latex = cleaned_latex.replace(/\\ge/g, '\\geq');
            cleaned_latex = cleaned_latex.replace(/\\ne/g, '\\neq');
            //cleaned_latex = cleaned_latex.replace(/\\}/g, '}');
            cleaned_latex = cleaned_latex.replace(/\\left/g, '');
            cleaned_latex = cleaned_latex.replace(/\\right/g, '');
            cleaned_latex = cleaned_latex.replace(/\\cdot/g, ' \\cdot ');
            cleaned_latex = cleaned_latex.replace(/\\times/g, ' \\times ');
            cleaned_latex = cleaned_latex.replace(/\\\s/g, ' ');
            cleaned_latex = cleaned_latex.replace(/\^([^{])/g, '^{$1}');
            cleaned_latex = cleaned_latex.replace(/\_([^{])/g, '_{$1}');
            break;
    }
    return cleaned_latex;
};


export default CleanBrackets;