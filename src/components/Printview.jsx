// PrintView.jsx
// Abre una ventana de impresión con el formato oficial TCU-782

const LOGO_URL = "https://upload.wikimedia.org/wikipedia/en/5/5b/Firma_vertical.png"

export function printSistematizacion(item) {
  const {
    actividad = "—",
    nombre = "—",
    comunidad = "—",
    fecha = "",
    horas = "—",
    participantes = "—",
    audiosVideos = {},
    consentimientos = {},
    notas = "—",
  } = item

  function formatFecha(f) {
    if (!f) return "—"
    const d = new Date(f)
    if (isNaN(d)) return f
    return d.toLocaleDateString("es-CR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const audioItems = audiosVideos?.items ?? []
  const consentPersonas = consentimientos?.personas ?? []

  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"/>
<title>TCU-782</title>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Times New Roman", Times, serif;
    font-size: 12pt;
    color: #000;
    padding: 2cm 2.5cm;
  }

  .header {
    position: relative;
    margin-bottom: 30px;
    min-height: 80px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  .header-logo {
    position: absolute;
    top: 0;
    left: 0;
    width: 70px;
    height: auto;
  }

  .header-text {
    text-align: center;
  }

  .header-text p {
    font-size: 11pt;
    line-height: 1.5;
  }

  .header-text .bold {
    font-weight: bold;
  }

  table.info {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 24px;
  }

  table.info td {
    border: 1px solid #000;
    padding: 8px 12px;
    vertical-align: top;
  }

  table.info td.label {
    font-weight: bold;
    width: 35%;
  }

  .section {
    margin-bottom: 20px;
  }

  .section-title {
    font-weight: bold;
    margin-bottom: 6px;
  }

  .section-body {
    line-height: 1.6;
    min-height: 48px;
    text-align: justify;
  }

  .sub-section {
    margin-bottom: 16px;
  }

  .sub-section-title {
    font-weight: bold;
    margin-bottom: 4px;
    font-size: 11pt;
  }

  ul.items {
    list-style: disc;
    padding-left: 20px;
    line-height: 1.8;
  }

  .footer {
    margin-top: 40px;
    font-size: 10pt;
    color: #555;
    text-align: right;
  }

  @media print {
    body {
      padding: 1.5cm 2cm;
    }
  }
</style>
</head>

<body>

  <div class="header">
    <img class="header-logo" src="${LOGO_URL}" alt="Logo UCR" />
    <div class="header-text">
      <p>Universidad de Costa Rica</p>
      <p>Sede del Pacífico</p>
      <p class="bold">TC-782 Patrimonio Cultural en Zonas Costeras e Insulares</p>
    </div>
  </div>

  <table class="info">
    <tr>
      <td class="label">Comunidad Visitada:</td>
      <td>${comunidad}</td>
    </tr>
    <tr>
      <td class="label">Fecha:</td>
      <td>${formatFecha(fecha)}</td>
    </tr>
    <tr>
      <td class="label">Responsable de la Actividad (Team):</td>
      <td>${nombre}</td>
    </tr>
    <tr>
      <td class="label">Estudiantes Participantes (cantidad):</td>
      <td>${participantes}</td>
    </tr>
    <tr>
      <td class="label">Horas realizadas:</td>
      <td>${horas}</td>
    </tr>
    <tr>
      <td class="label">Actividad:</td>
      <td>${actividad}</td>
    </tr>
  </table>

  <div class="section">
    <p class="section-title">Observaciones / Notas:</p>
    <p class="section-body">${notas}</p>
  </div>

  <div class="sub-section">
    <p class="sub-section-title">Audios / Videos recopilados:</p>
    ${audioItems.length > 0
      ? `<ul class="items">${audioItems.map(m => `<li>${m.titulo} — ${m.propietario}</li>`).join("")}</ul>`
      : "<p>Ninguno registrado.</p>"
    }
  </div>

  <div class="sub-section">
    <p class="sub-section-title">Consentimientos informados:</p>
    ${consentPersonas.length > 0
      ? `<ul class="items">${consentPersonas.map(c => `<li>${c.nombre} — ${c.cantidad} consentimiento(s)</li>`).join("")}</ul>`
      : "<p>Ninguno registrado.</p>"
    }
  </div>

  <div class="footer">
    Generado por sistema TCU-782 · ${new Date().toLocaleDateString("es-CR")}
  </div>

  <script>
    window.onload = function () {
      window.print()
      window.onafterprint = function () { window.close() }
    }
  </script>

</body>
</html>
  `

  const win = window.open("", "_blank", "width=900,height=700")
  win.document.write(html)
  win.document.close()
}