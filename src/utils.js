var CleanBrackets = (latex) => {
    var cleaned_latex = latex.replace(/\\{/g, '{');
    cleaned_latex = cleaned_latex.replace(/\\}/g, '}');
    cleaned_latex = cleaned_latex.replace(/\\%/g, '%');
    cleaned_latex = cleaned_latex.replace(/\\le(?!ft)/g, '\\leq');
    cleaned_latex = cleaned_latex.replace(/\\ge/g, '\\geq');
    cleaned_latex = cleaned_latex.replace(/\\ne/g, '\\neq');
    cleaned_latex = cleaned_latex.replace(/\\}/g, '}');
    cleaned_latex = cleaned_latex.replace(/\\left/g, '');
    cleaned_latex = cleaned_latex.replace(/\\right/g, '');
    cleaned_latex = cleaned_latex.replace(/\\cdot/g, ' \\cdot ');
    cleaned_latex = cleaned_latex.replace(/\\times/g, ' \\times ');
    cleaned_latex = cleaned_latex.replace(/\\\s/g, ' ');
    cleaned_latex = cleaned_latex.replace(/\^([^{])/g, '^{$1}');
    cleaned_latex = cleaned_latex.replace(/\_([^{])/g, '_{$1}');
    return cleaned_latex;
}


export default CleanBrackets;