function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Confeitaria Bejiroo')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}