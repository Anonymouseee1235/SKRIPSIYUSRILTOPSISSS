// Code.gs - Apps Script Integration (Optional for Web App Backend)
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('Dashboard Analisis Risiko Conveyor - PT. ABC')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
