export function formatMessage(text: string): string {
  // Replace **text** with <strong>text</strong> while preserving line breaks
  const boldFormatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Replace line breaks with <br/> tags
  return boldFormatted.replace(/\n/g, '<br/>');
}
