"""
Script de Generación de 5 CVs Especializados en Formato ATS (1 Página, 1 Columna)
Entidad: CAR-TALENT-WAR-ROOM // Gustavo De La Rosa
Ruta Destino: D:\Worck\02_PORTAFOLIO\CAR_TALENT_WAR_ROOM_2026\02_MATRIZ_5_PERFILES_CV\
Copia Web: D:\Worck\02_PORTAFOLIO\Portafolio_NOVUX_GustavoDeLaRosa\public\cv-perfiles\
"""
import os
import shutil
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

BASE_DIR = r"D:\Worck\02_PORTAFOLIO\CAR_TALENT_WAR_ROOM_2026\02_MATRIZ_5_PERFILES_CV"
WEB_DIR = r"D:\Worck\02_PORTAFOLIO\Portafolio_NOVUX_GustavoDeLaRosa\public\cv-perfiles"

os.makedirs(BASE_DIR, exist_ok=True)
os.makedirs(WEB_DIR, exist_ok=True)

# Paleta Ejecutiva Muted
NAVY_HEX = "0F172A"
SLATE_HEX = "1E293B"
MUTED_HEX = "475569"
ACCENT_HEX = "1D4ED8"
BORDER_HEX = "CBD5E1"

NAVY_RGB = RGBColor(15, 23, 42)
SLATE_RGB = RGBColor(30, 41, 59)
MUTED_RGB = RGBColor(71, 85, 105)
WHITE_RGB = RGBColor(255, 255, 255)
ACCENT_RGB = RGBColor(29, 78, 216)

def set_tc_bg(cell, hex_c):
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_c}"/>')
    cell._tc.get_or_add_tcPr().append(shd)

def set_tc_margins(cell, top=100, bottom=100, left=140, right=140):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, v in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(v))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def create_ats_cv(filename, title_role, summary_text, exp_bullets, proj_bullets, certs_list, skills_dict):
    # 1. GENERAR DOCX ATS
    doc = docx.Document()
    for sec in doc.sections:
        sec.top_margin = Inches(0.5)
        sec.bottom_margin = Inches(0.5)
        sec.left_margin = Inches(0.6)
        sec.right_margin = Inches(0.6)

    # Header Banner
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    c = tbl.cell(0, 0)
    set_tc_bg(c, NAVY_HEX)
    set_tc_margins(c, 140, 140, 160, 160)
    p = c.paragraphs[0]
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(2)
    
    r1 = p.add_run("GUSTAVO ALBERTO DE LA ROSA FLÓREZ\n")
    r1.font.name = "Calibri"
    r1.font.size = Pt(14)
    r1.font.bold = True
    r1.font.color.rgb = WHITE_RGB
    
    r2 = p.add_run(title_role + "\n")
    r2.font.name = "Calibri"
    r2.font.size = Pt(10)
    r2.font.bold = True
    r2.font.color.rgb = RGBColor(147, 197, 253)
    
    r3 = p.add_run("Bogotá, Colombia | Portafolio Web: https://www.novuxops.com/ | Gustavodlr53@gmail.com | +57 319 6300410 | linkedin.com/in/tavodelarosaf | github.com/tavodf")
    r3.font.name = "Calibri"
    r3.font.size = Pt(8.5)
    r3.font.color.rgb = RGBColor(226, 232, 240)
    
    def add_sec_title(txt):
        p_sec = doc.add_paragraph()
        p_sec.paragraph_format.space_before = Pt(6)
        p_sec.paragraph_format.space_after = Pt(2)
        r = p_sec.add_run(txt)
        r.font.name = "Calibri"
        r.font.size = Pt(10.5)
        r.font.bold = True
        r.font.color.rgb = NAVY_RGB
        pBdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="6" w:space="2" w:color="{ACCENT_HEX}"/></w:pBdr>')
        p_sec._p.get_or_add_pPr().append(pBdr)

    def add_bullet(bold_prefix, text):
        p_b = doc.add_paragraph(style='List Bullet')
        p_b.paragraph_format.space_before = Pt(0.5)
        p_b.paragraph_format.space_after = Pt(1.5)
        p_b.paragraph_format.line_spacing = 1.05
        rb = p_b.add_run(bold_prefix)
        rb.font.name = "Calibri"
        rb.font.size = Pt(9.0)
        rb.font.bold = True
        rb.font.color.rgb = SLATE_RGB
        rn = p_b.add_run(text)
        rn.font.name = "Calibri"
        rn.font.size = Pt(9.0)
        rn.font.color.rgb = SLATE_RGB

    # Resumen Profesional
    add_sec_title("RESUMEN PROFESIONAL")
    p_sum = doc.add_paragraph()
    p_sum.paragraph_format.space_before = Pt(1)
    p_sum.paragraph_format.space_after = Pt(3)
    p_sum.paragraph_format.line_spacing = 1.08
    r_s = p_sum.add_run(summary_text)
    r_s.font.name = "Calibri"
    r_s.font.size = Pt(9.0)
    r_s.font.color.rgb = SLATE_RGB

    # Experiencia Laboral
    add_sec_title("EXPERIENCIA LABORAL Y GESTIÓN OPERATIVA")
    for company, role, dates, b_list in exp_bullets:
        p_e = doc.add_paragraph()
        p_e.paragraph_format.space_before = Pt(3)
        p_e.paragraph_format.space_after = Pt(1)
        re1 = p_e.add_run(f"{role} | {company}")
        re1.font.name = "Calibri"
        re1.font.size = Pt(9.5)
        re1.font.bold = True
        re1.font.color.rgb = NAVY_RGB
        re2 = p_e.add_run(f" ({dates})")
        re2.font.name = "Calibri"
        re2.font.size = Pt(8.5)
        re2.font.italic = True
        re2.font.color.rgb = MUTED_RGB
        for bp, bt in b_list:
            add_bullet(bp, bt)

    # Proyectos Técnicos y Portafolio
    add_sec_title("PROYECTOS TÉCNICOS & PORTAFOLIO EN PRODUCCIÓN (novuxops.com)")
    for p_name, p_stack, p_desc in proj_bullets:
        add_bullet(f"{p_name} ({p_stack}): ", p_desc)

    # Educación y Certificaciones Clave
    add_sec_title("CERTIFICACIONES VERIFICABLES & FORMACIÓN CONTINUA")
    for cert_org, cert_detail in certs_list:
        add_bullet(f"{cert_org}: ", cert_detail)

    # Competencias Clave
    add_sec_title("COMPETENCIAS CLAVE")
    p_sk = doc.add_paragraph()
    p_sk.paragraph_format.space_before = Pt(1)
    p_sk.paragraph_format.space_after = Pt(2)
    p_sk.paragraph_format.line_spacing = 1.05
    for cat, items in skills_dict.items():
        rc = p_sk.add_run(f"• {cat}: ")
        rc.font.name = "Calibri"
        rc.font.size = Pt(8.5)
        rc.font.bold = True
        rc.font.color.rgb = NAVY_RGB
        ri = p_sk.add_run(f"{items}\n")
        ri.font.name = "Calibri"
        ri.font.size = Pt(8.5)
        ri.font.color.rgb = SLATE_RGB

    filepath = os.path.join(BASE_DIR, filename)
    doc.save(filepath)
    # Copia en directorio web
    web_filepath = os.path.join(WEB_DIR, filename)
    shutil.copyfile(filepath, web_filepath)
    print(f"Generado DOCX: {filepath}")

    # 2. GENERAR VERSIÓN MARKDOWN (.MD) SOBERANA
    md_filename = filename.replace(".docx", ".md")
    md_lines = []
    md_lines.append("# GUSTAVO ALBERTO DE LA ROSA FLÓREZ")
    md_lines.append(f"**{title_role}**\n")
    md_lines.append("Bogotá, Colombia | Portafolio Web: [novuxops.com](https://www.novuxops.com/) | Gustavodlr53@gmail.com | +57 319 6300410 | [LinkedIn](https://linkedin.com/in/tavodelarosaf) | [GitHub](https://github.com/tavodf)\n")
    md_lines.append("---\n")
    md_lines.append("## RESUMEN PROFESIONAL")
    md_lines.append(f"{summary_text}\n")
    md_lines.append("## EXPERIENCIA LABORAL Y GESTIÓN OPERATIVA")
    for company, role, dates, b_list in exp_bullets:
        md_lines.append(f"### {role} | {company} *({dates})*")
        for bp, bt in b_list:
            md_lines.append(f"- **{bp.strip()}** {bt}")
        md_lines.append("")
    md_lines.append("## PROYECTOS TÉCNICOS & PORTAFOLIO EN PRODUCCIÓN (novuxops.com)")
    for p_name, p_stack, p_desc in proj_bullets:
        md_lines.append(f"- **{p_name} ({p_stack}):** {p_desc}")
    md_lines.append("")
    md_lines.append("## CERTIFICACIONES VERIFICABLES & FORMACIÓN CONTINUA")
    for cert_org, cert_detail in certs_list:
        md_lines.append(f"- **{cert_org}:** {cert_detail}")
    md_lines.append("")
    md_lines.append("## COMPETENCIAS CLAVE")
    for cat, items in skills_dict.items():
        md_lines.append(f"- **{cat}:** {items}")
    md_lines.append("")

    md_content = "\n".join(md_lines)
    md_path_base = os.path.join(BASE_DIR, md_filename)
    with open(md_path_base, "w", encoding="utf-8") as f:
        f.write(md_content)
    md_path_web = os.path.join(WEB_DIR, md_filename)
    with open(md_path_web, "w", encoding="utf-8") as f:
        f.write(md_content)
    print(f"Generado MD: {md_path_base}")

# Datos comunes de certificaciones
certs_comunes_legal_data = [
    ("Cámara de Comercio de Bogotá", "Diplomado de Conciliación en Equidad (120h, Centro de Arbitraje y Conciliación) | IX Congreso Nacional de Justicia en Equidad"),
    ("IBM SkillsBuild & Coursera", "Python for Data Science, AI & Development | Machine Learning with Python | Data Visualization with Excel & Cognos | Agile Explorer (Credly)"),
    ("MinTIC & Univ. Distrital", "Formación Continua en Lenguaje de Programación Python (50h)"),
    ("Avianca Express", "Safety Management System (SMS) Nota: 100% | Seguridad de la Aviación (AVSEC) Nota: 100% | Ley FCPA Anticorrupción"),
    ("Google & SENA", "Google AI Essentials | Certificación Profesional en Comercio Electrónico (40h, EOI España)")
]

# PERFIL 1: Lead Data & Automation Solutions Architect
create_ats_cv(
    "CV_Gustavo_DeLaRosa_Perfil1_Lead_Data_Automation_Architect.docx",
    "Lead Data & Automation Solutions Architect | Python · SQL · FastAPI · ETL · AI Systems",
    "Arquitecto de Soluciones de Datos y Automatización con 2 años de trayectoria consolidada (1 año y 11 meses a nivel operativo) integrando ingeniería de software, analítica avanzada y liderazgo operativo en campo (liderando operaciones críticas de datos y 60 gestores territoriales en el sector público). Especialista en construir pipelines ETL resilientes en Python, microservicios FastAPI de baja latencia (<162 ms P95) y sistemas de procesamiento masivo (+131k interacciones operativas estructuradas), reduciendo en más de un 70% los tiempos de respuesta. Respaldado por portafolio en vivo en novuxops.com y más de 920 horas de formación certificada por IBM, Google y la Cámara de Comercio de Bogotá.",
    [
        ("Fondo de Desarrollo Local de Santa Fe", "Coordinador Técnico Operativo & Analista de Datos Territorial", "Dic. 2024 – Actualidad", [
            ("Liderazgo y Coordinación en Campo: ", "Lideré a 60 gestores territoriales para inspección, vigilancia y control (IVC) en un corredor con más de 1.2M de población flotante al día."),
            ("Arquitectura ETL & Automatización: ", "Diseñé flujos en Python (Pandas, Regex) para ingesta, limpieza y validación de más de 131.000 registros, auditando la recuperación de 245.000 m² de espacio público."),
            ("Calidad de Datos y Reportería: ", "Estructuré matrices de control de calidad bajo marco MIPG (depuración de 8.000 a 5.000 registros) y dashboards en Looker Studio para toma de decisiones.")
        ]),
        ("Avianca Express", "Operaciones Terrestres & Safety Management System (SMS)", "2021 – 2023", [
            ("Seguridad Operacional: ", "Aplicación de normatividad aeronáutica y protocolos SMS en rampa con 100% de cumplimiento y calificación perfecta en auditorías.")
        ])
    ],
    [
        ("NOVUX COT", "Python, FastAPI, GeoPandas, WebGL", "Centro de comando y control C2 para balanceo dinámico de rutas y turnos de 60 gestores territoriales."),
        ("NOVUX CPC / Idealista", "FastAPI, React, SQL", "Servicios backend de alta velocidad con latencia P95 de 162 ms y automatización del 62% en auditoría normativa."),
        ("ARES Scraper L7 & PCD", "Python, Playwright, Asyncio", "Motores de extracción web resiliente con 98.4% de efectividad y saneamiento del 39.2% de ruido en datos comerciales.")
    ],
    certs_comunes_legal_data,
    {
        "Backend & Datos": "Python (Pandas, FastAPI, Asyncio, Pydantic, SQLAlchemy), SQL (PostgreSQL, BigQuery, SQLite), ETL/ELT Pipelines, Regex",
        "Visualización & Cloud": "Looker Studio, Excel Avanzado (Power Query), Git/GitHub, Docker, WebGL 2.0, APIs REST",
        "Gestión & Liderazgo": "Metodologías Ágiles (Scrum/Kanban WIP=1), Conciliación en Equidad (CCB), Liderazgo de Equipos, Seguridad Operacional"
    }
)

# PERFIL 2: Data Engineer & ETL Pipeline Specialist
create_ats_cv(
    "CV_Gustavo_DeLaRosa_Perfil2_Data_Engineer_ETL.docx",
    "Data Engineer & ETL Pipeline Specialist | Python (Pandas/NumPy) · SQL · BigQuery · Data Quality",
    "Ingeniero de Datos y Especialista en Pipelines ETL/ELT con 1 año y 11 meses de experiencia verificada en el sector público transformando grandes volúmenes de datos no estructurados en almacenes analíticos limpios y estructurados. Experto en deduplicación algorítmica, contratos de datos con Pydantic, modelado dimensional en SQL (Window Functions, CTEs) y orquestación con Python (Pandas, NumPy, AsyncIO), reduciendo en más del 70% los tiempos de consolidación de datos. Certificado por IBM en Python for Data Science & AI, Machine Learning with Python y Data Analytics Essentials.",
    [
        ("Fondo de Desarrollo Local de Santa Fe", "Ingeniero de Datos & Coordinador Técnico Operativo", "Dic. 2024 – Actualidad", [
            ("Procesamiento ETL de +131.000 Registros: ", "Construí flujos de transformación en Python que limpiaron registros desestructurados desde mensajería instantánea hacia bases tabulares con cero pérdida de trazabilidad."),
            ("Saneamiento y Control de Integridad: ", "Implementé algoritmos que filtraron inconsistencias en lotes de 8.000 a 5.000 registros de alta fidelidad técnica para seguimiento territorial."),
            ("Automatización de Auditoría Espacial: ", "Desarrollé scripts de validación que auditaron más de 245.000 m² de intervenciones en espacio público con reportes automáticos.")
        ])
    ],
    [
        ("Pipeline de Saneamiento NOVUX PCD", "Python, NumPy, Requests", "Normalización matemática de unidades y filtrado automático del 39.2% de ruido en lotes de datos comerciales (8.420 a 5.118 registros limpios)."),
        ("ARES Scraper Data Engine", "Python, AsyncIO, SQLite", "Extracción y almacenamiento por lotes con 98.4% de éxito en solicitudes sin bloqueos."),
        ("Endpoints Analíticos NOVUX CPC", "FastAPI, PostgreSQL", "Servicios de consulta optimizados alcanzando latencia P95 de 162 ms.")
    ],
    certs_comunes_legal_data,
    {
        "Pipelines & ETL": "Python 3.11 (Pandas, NumPy, Asyncio, Pydantic, SQLAlchemy 2.0), Ingesta Masiva, Data Cleaning, Regex/NLP",
        "Bases de Datos & SQL": "SQL Avanzado (Window Functions, CTEs, Particionamiento), PostgreSQL, BigQuery, SQLite",
        "Herramientas & Entorno": "Git/GitHub, Linux/Bash, Looker Studio, APIs REST, Metodología Ágil"
    }
)

# PERFIL 3: Senior Data Analyst & BI Lead
create_ats_cv(
    "CV_Gustavo_DeLaRosa_Perfil3_Senior_Data_Analyst_BI.docx",
    "Senior Data Analyst & BI Lead | SQL · Python · Looker Studio · Excel Analítico · KPIs & Dashboarding",
    "Analista de Datos Senior y Especialista en Inteligencia de Negocios (BI) con 1 año y 11 meses de experiencia convirtiendo información operativa compleja en tableros ejecutivos e indicadores de rendimiento (KPIs). Experto en el ciclo completo de análisis (Ask, Prepare, Process, Analyze, Share, Act) aplicando SQL avanzado, Python (Pandas, Matplotlib) y Looker Studio para optimizar la toma de decisiones en operaciones con más de 1.2M de población flotante diaria. Certificado por IBM en Data Visualization with Dashboards, Excel Essentials y Machine Learning.",
    [
        ("Fondo de Desarrollo Local de Santa Fe", "Analista de Datos Territorial & Coordinador Operativo", "Dic. 2024 – Actualidad", [
            ("Tableros Ejecutivos en Looker Studio: ", "Diseñé tableros de control y mapas interactivos que redujeron en más del 70% los tiempos de consolidación de informes semanales para directivos."),
            ("Monitoreo Operativo & Métricas Clave: ", "Estructuré indicadores para evaluar la cobertura y desempeño en terreno de 60 gestores operativos sobre 245.000 m² auditados."),
            ("Modelado y Calidad de Datos: ", "Desarrollé consultas analíticas en SQL y scripts en Python para cruzar bases de datos dispersas y detectar cuellos de botella operativos.")
        ])
    ],
    [
        ("Command Center Analítico NOVUX CPC", "Python, Looker Studio, SQL", "Scoring algorítmico ponderado (0-100) para auditar desempeño de 229 actores públicos con +62% de automatización."),
        ("Monitor de Precios Multitienda NOVUX PCD", "Python, Matplotlib, Excel", "Análisis comparativo de fluctuación de precios de grandes superficies filtrando el 39.2% de ruido."),
        ("Matriz de Turnos y Cobertura NOVUX COT", "Pandas, GeoPandas, Looker Studio", "Modelo de asignación con buffer operativo del 10%-15% para personal de campo.")
    ],
    certs_comunes_legal_data,
    {
        "Analítica & BI": "Looker Studio, Excel Analítico (Power Query, Modelos de Datos), IBM Cognos, Dashboards Ejecutivos, KPIs",
        "Análisis Técnico": "SQL (Consultas complejas, agrupaciones, Window Functions), Python (Pandas, Matplotlib, Scikit-learn)",
        "Habilidades de Negocio": "Google Data Analytics Framework, Metodología Agile, Presentación de Insights a Stakeholders"
    }
)

# PERFIL 4: Python Automation & Web Scraping Engineer
create_ats_cv(
    "CV_Gustavo_DeLaRosa_Perfil4_Python_Automation_Scraping.docx",
    "Python Automation & Web Scraping Engineer | Playwright · Asyncio · FastAPI · Requests · Resilient Bots",
    "Desarrollador Python especializado en Automatización de Procesos (RPA), Extracción Web Resiliente (Capa 7) y Microservicios Backend con 1.250 horas de código materializado en producción (12 repositorios Git locales y 216 scripts Python). Creador de la arquitectura ARES Scraper L7 con 98.4% de tasa de éxito en extracción sin bloqueos y endpoints en FastAPI con latencia P95 de 162 ms. Experiencia comprobada de 1 año y 11 meses automatizando la captura de datos en el sector público (Alcaldía Local de Santa Fe).",
    [
        ("NOVUX D&D", "Ingeniero de Automatización & Desarrollo Python", "2020 – Actualidad", [
            ("ARES Scraper L7 (Playwright, BS4, Asyncio): ", "Construí un motor de extracción asíncrona multi-hilo con rotación inteligente y evasión de bloqueos, alcanzando un 98.4% de peticiones exitosas (+63% aceleración de pipeline)."),
            ("Extractor E-Commerce NOVUX PCD: ", "Desarrollé scripts de extracción y normalización de catálogos comerciales (probado en grandes superficies) con memoria adaptativa de cambios en el DOM."),
            ("Backend de Alta Velocidad NOVUX CPC: ", "Implementé APIs asíncronas con FastAPI y Uvicorn optimizadas para latencia en P95 de 162 ms.")
        ]),
        ("Fondo de Desarrollo Local de Santa Fe", "Especialista en Automatización de Reportes", "Dic. 2024 – Actualidad", [
            ("Captura Automatizada de Evidencias: ", "Orquesté scripts en Python para capturar, validar y clasificar más de 131.000 mensajes y registros fotográficos reduciendo en >70% la digitación manual.")
        ])
    ],
    [
        ("ARES Scraper L7", "Python 3.11, Playwright, BS4", "Extracción web masiva y estructuración automática de prospectos comerciales."),
        ("NOVUX PCD", "Python, Selenium, Requests", "Monitoreo multitienda en tiempo real y normalización matemática de catálogos.")
    ],
    certs_comunes_legal_data,
    {
        "Lenguajes & Automatización": "Python 3.11 (POO, AsyncIO, Playwright, Selenium, BeautifulSoup4, Requests), RPA, CLI Tooling",
        "Backend & Persistencia": "FastAPI, Uvicorn, Pydantic, SQLAlchemy, SQLite, PostgreSQL, Linux/Bash, Git",
        "Prácticas de Código": "Manejo Robusto de Excepciones de Red, Rotación de Headers, Control de Concurrencia"
    }
)

# PERFIL 5: Coordinador de Operaciones, Eficiencia Pública y Resolución de Conflictos
create_ats_cv(
    "CV_Gustavo_DeLaRosa_Perfil5_Operaciones_Eficiencia_Publica.docx",
    "Coordinador de Operaciones & Eficiencia Pública | Gestión Territorial · Conciliación (120h CCB) · MIPG",
    "Coordinador de Operaciones y Consultor en Eficiencia Territorial con 1 año y 11 meses de experiencia liderando equipos de campo y modernizando procesos en el sector público (Alcaldía Local de Santa Fe). Diplomado en Conciliación en Equidad (120 horas) por el Centro de Arbitraje y Conciliación de la Cámara de Comercio de Bogotá, con sólida capacidad para la mediación de conflictos en espacio público, gestión comunitaria y articulación interinstitucional. Combino el liderazgo de equipos humanos (coordinación de 60 gestores en calle) con herramientas digitales y datos para eliminar el papeleo manual y garantizar el 100% de cumplimiento institucional.",
    [
        ("Fondo de Desarrollo Local de Santa Fe", "Coordinador Técnico Operativo (UPZ 91, 92 y 93)", "Sept. 2025 – Actualidad", [
            ("Liderazgo y Coordinación en Terreno: ", "Lideré a 60 gestores en espacio público para inspección, vigilancia y control (IVC), convivencia ciudadana y atención de conflictividades."),
            ("Mediación y Gestión Comunitaria: ", "Apliqué principios de conciliación en equidad y concertación con comerciantes informales y juntas de acción comunal, previniendo escalamientos de conflictos."),
            ("Eficiencia de Procesos & MIPG: ", "Modernicé la rendición de reportes y actas reduciendo los tiempos de consolidación en más del 70% bajo estricto cumplimiento del marco normativo estatal.")
        ]),
        ("Fondo de Desarrollo Local de Santa Fe", "Gestor de Seguridad y Convivencia Ciudadana", "Dic. 2024 – Sept. 2025", [
            ("Control Territorial: ", "Verificación de ocupaciones indebidas y levantamiento de datos primarios en zonas críticas del centro de la ciudad.")
        ]),
        ("Avianca Express", "Operaciones Terrestres & Safety Management System (SMS)", "2021 – 2023", [
            ("Seguridad Operacional: ", "Coordinación logística bajo estándares de alta exigencia operacional aeroportuaria con calificación del 100% en SMS y AVSEC.")
        ])
    ],
    [
        ("Gestor Operativo NOVUX COT", "Software de Coordinación", "Sistema digital para asignación equilibrada de turnos y verificación fotográfica en terreno de 60 gestores."),
        ("Sistematización de Derechos de Petición", "LegalTech Asistido", "Flujos automatizados para estructurar diagnósticos y respuestas técnicas oportunas bajo Ley 1755 de 2015.")
    ],
    certs_comunes_legal_data,
    {
        "Liderazgo & Gestión": "Coordinación de Personal en Terreno (60 personas), Conciliación en Equidad (CCB), Mediación de Conflictos",
        "Marco Normativo Público": "Modelo Integrado de Planeación y Gestión (MIPG), Ley 1801 (Código Convivencia), Ley 1755 (Petición), SECOP II",
        "Herramientas & Métodos": "Python Básico para Datos, Excel Avanzado, Looker Studio, Metodologías Ágiles (Agile Explorer IBM)"
    }
)

print("Proceso de generación finalizado con éxito.")
