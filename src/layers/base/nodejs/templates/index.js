const getTemplateText = (template, replacements) => {
  const fs = require('fs')
  const data = fs.readFileSync(template, 'utf8') || "";

  return mapTemplate(data, replacements);
}

// super simplified version of replacing
// should this get more complicated consider using handlebars or similar
const mapTemplate = (template, replacements) => {
  if (!replacements || replacements.length <= 0) 
      return template;

  for( let i = 0; i < replacements.length; i++) {
      const key = replacements[i].key;
      const replacement = replacements[i].value;
      
      const pattern = new RegExp('\\{\\{' + key + '\\}\\}', 'gi');
      template = template.replace(pattern, replacement);
  }

  return template;
}


module.exports = getTemplateText;