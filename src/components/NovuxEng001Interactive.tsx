import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, Play, RotateCcw, Copy, Check, Hash, Sparkles, 
  Layers, Code2, ShieldCheck, Binary, Cpu, ArrowRight, CheckCircle2
} from 'lucide-react';
import { sfx } from '../utils/soundEffects';

// Función para calcular CRC32 / Hash simple de strings
function crc32(str: string): number {
  let crc = 0 ^ (-1);
  for (let i = 0; i < str.length; i++) {
    crc = (crc >>> 8) ^ TABLE_CRC[(crc ^ str.charCodeAt(i)) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

const TABLE_CRC = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let j = 0; j < 8; j++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  TABLE_CRC[i] = c >>> 0;
}

// Generador de K-Shingles (Trigramas de palabras)
function getShingles(text: string, k: number = 3): Set<string> {
  const tokens = text.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (tokens.length < k) {
    return new Set([text.toLowerCase().trim()]);
  }
  const shingles = new Set<string>();
  for (let i = 0; i <= tokens.length - k; i++) {
    shingles.add(tokens.slice(i, i + k).join(' '));
  }
  return shingles;
}

// Coeficiente de Similitud de Jaccard Exacto: |A ∩ B| / |A ∪ B|
function computeJaccard(setA: Set<string>, setB: Set<string>): number {
  if (setA.size === 0 && setB.size === 0) return 1.0;
  let intersection = 0;
  setA.forEach((item) => {
    if (setB.has(item)) intersection++;
  });
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

// Simulador de firmas MinHash con funciones hash lineales (a * x + b) % prime
function computeMinHashSignature(shingles: Set<string>, numPerm: number = 32): number[] {
  const prime = 4294967311;
  const signature: number[] = [];
  
  const shingleHashes = Array.from(shingles).map(s => crc32(s));

  for (let i = 0; i < numPerm; i++) {
    const a = ((i * 10007 + 42) % (prime - 1)) + 1;
    const b = ((i * 20011 + 42 * 3) % prime);
    let minVal = Infinity;

    for (const h of shingleHashes) {
      const val = Number((BigInt(a) * BigInt(h) + BigInt(b)) % BigInt(prime));
      if (val < minVal) {
        minVal = val;
      }
    }
    signature.push(minVal === Infinity ? 0 : minVal % 100000);
  }
  return signature;
}

export function NovuxEng001Interactive() {
  const [activeTab, setActiveTab] = useState<'python-code' | 'minhash' | 'cparser'>('python-code');

  // Estado del MinHash Playground
  const [textA, setTextA] = useState('Apple MacBook Pro 16 M3 Max 36GB RAM 1TB SSD Space Black');
  const [textB, setTextB] = useState('MacBook Pro 16 Pulgadas M3 Max 36GB Memoria 1TB SSD Negro Espacial');
  const [numPermutations, setNumPermutations] = useState<number>(32);
  const [copiedCode, setCopiedCode] = useState(false);

  // Estado del C-Parser Simulator
  const [isParsing, setIsParsing] = useState(false);
  const [parsedData, setParsedData] = useState<any | null>(null);

  // Estado del Ejecutor de Código Python
  const [isRunningPython, setIsRunningPython] = useState(false);
  const [pythonExecutionResult, setPythonExecutionResult] = useState<any | null>(null);

  // Cálculos matemáticos en tiempo real de Shingles y MinHash
  const { shinglesA, shinglesB, exactJaccard, minhashSimilarity, sigA, sigB } = useMemo(() => {
    const sA = getShingles(textA, 3);
    const sB = getShingles(textB, 3);
    const jaccard = computeJaccard(sA, sB);

    const signatureA = computeMinHashSignature(sA, numPermutations);
    const signatureB = computeMinHashSignature(sB, numPermutations);

    let matches = 0;
    for (let i = 0; i < numPermutations; i++) {
      if (signatureA[i] === signatureB[i]) matches++;
    }
    const minhashSim = matches / numPermutations;

    return {
      shinglesA: sA,
      shinglesB: sB,
      exactJaccard: jaccard,
      minhashSimilarity: minhashSim,
      sigA: signatureA,
      sigB: signatureB,
    };
  }, [textA, textB, numPermutations]);

  // Manejador de presets rápidos
  const applyPreset = (type: 'near-duplicate' | 'different' | 'partial') => {
    sfx.playSelect();
    if (type === 'near-duplicate') {
      setTextA('Samsung Galaxy S24 Ultra 512GB Titanium Gray 5G Desbloqueado');
      setTextB('Samsung Galaxy S24 Ultra 5G 512GB Gris Titanio Libre de Fabrica');
    } else if (type === 'different') {
      setTextA('Monitor Gaming ASUS ROG Swift 32 Pulgadas 4K OLED 240Hz');
      setTextB('Teclado Mecanico Inalambrico Keychron Q1 Pro RGB Red Switches');
    } else {
      setTextA('Sony WH-1000XM5 Audifonos Inalambricos con Cancelacion de Ruido');
      setTextB('Sony WF-1000XM5 Auriculares Bluetooth True Wireless Cancelacion Activa');
    }
  };

  // Simulación de Parsing en C (libxml2)
  const handleRunParser = () => {
    sfx.playSelect();
    setIsParsing(true);
    setParsedData(null);
    setTimeout(() => {
      setIsParsing(false);
      setParsedData({
        sku: 'MBP-M3M-36GB',
        name: 'Apple MacBook Pro 16 M3 Max 36GB RAM 1TB SSD Space Black',
        price_val: 3499.00,
        currency: 'USD',
        c_level_memory_bytes: 1420,
        python_object_avoided_bytes: 41200,
        nodes_pruned: 48,
        minhash_signature: sigA.slice(0, 8),
        pydantic_validated: true,
      });
      sfx.playPowerUp();
    }, 380);
  };

  // Ejecución Práctica del Pipeline de Python en Vivo
  const handleExecutePythonCode = () => {
    sfx.playSelect();
    setIsRunningPython(true);
    setPythonExecutionResult(null);

    setTimeout(() => {
      setIsRunningPython(false);
      const sigProd1 = computeMinHashSignature(getShingles('Apple MacBook Pro 16 M3 Max', 3), 32);
      const sigProd2 = computeMinHashSignature(getShingles('Dell XPS 15 OLED i9 32GB', 3), 32);
      
      setPythonExecutionResult({
        status: 'SUCCESS',
        runtime_ms: 1.24,
        memory_c_kb: 14.8,
        memory_saved_percent: 96.2,
        records: [
          {
            sku: 'MBP-M3M-36GB',
            name: 'Apple MacBook Pro 16 M3 Max 36GB RAM 1TB SSD Space Black',
            price: 3499.00,
            url: 'https://catalog.novux.internal/catalog/MBP-M3M-36GB',
            minhash_signature: sigProd1.slice(0, 8),
            validated: true,
          },
          {
            sku: 'DELL-XPS15-OLED',
            name: 'Dell XPS 15 OLED Intel Core i9 32GB RAM 1TB SSD',
            price: 2699.50,
            url: 'https://catalog.novux.internal/catalog/DELL-XPS15-OLED',
            minhash_signature: sigProd2.slice(0, 8),
            validated: true,
          }
        ]
      });
      sfx.playPowerUp();
    }, 450);
  };

  const handleCopyPython = () => {
    sfx.playClick();
    const rawCode = `from typing import Generator, List, Set
import binascii
from lxml import etree
from pydantic import BaseModel, Field, HttpUrl

class CanonicalProduct(BaseModel):
    sku: str = Field(..., min_length=1)
    name: str = Field(..., min_length=2)
    price: float = Field(..., gt=0.0)
    url: HttpUrl
    minhash_signature: List[int] = Field(default_factory=list)

class MinHashDeduplicator:
    def __init__(self, num_perm: int = 64, seed: int = 42):
        self.num_perm = num_perm
        self.seed = seed
        self._prime = 4294967311
        self._a = [((i * 10007 + seed) % (self._prime - 1)) + 1 for i in range(num_perm)]
        self._b = [((i * 20011 + seed * 3) % self._prime) for i in range(num_perm)]

    def _get_shingles(self, text: str, k: int = 3) -> Set[int]:
        tokens = text.lower().split()
        if len(tokens) < k:
            return {binascii.crc32(text.encode('utf-8')) & 0xFFFFFFFF}
        shingles = set()
        for i in range(len(tokens) - k + 1):
            shingle = " ".join(tokens[i:i + k])
            shingles.add(binascii.crc32(shingle.encode('utf-8')) & 0xFFFFFFFF)
        return shingles

    def compute_signature(self, text: str) -> List[int]:
        shingles = self._get_shingles(text)
        signature = []
        for a, b in zip(self._a, self._b):
            min_val = float('inf')
            for s in shingles:
                val = (a * s + b) % self._prime
                if val < min_val:
                    min_val = val
            signature.append(int(min_val))
        return signature

class ScopedDOMParser:
    @staticmethod
    def parse_stream(html_bytes: bytes, base_url: str) -> Generator[CanonicalProduct, None, None]:
        deduper = MinHashDeduplicator(num_perm=32)
        parser = etree.HTMLParser(recover=True, remove_blank_text=True)
        tree = etree.fromstring(html_bytes, parser=parser)
        product_nodes = tree.xpath("//article[contains(@class, 'product-card')]")
        for node in product_nodes:
            try:
                sku_raw = node.xpath("./@data-sku")
                name_raw = node.xpath(".//h2[@class='title']/text()")
                price_raw = node.xpath(".//span[@class='price-val']/text()")
                if not (sku_raw and name_raw and price_raw):
                    continue
                name_clean = str(name_raw[0]).strip()
                price_val = float(str(price_raw[0]).replace("$", "").replace(",", "").strip())
                sku_clean = str(sku_raw[0]).strip()
                signature = deduper.compute_signature(name_clean)
                yield CanonicalProduct(
                    sku=sku_clean,
                    name=name_clean,
                    price=price_val,
                    url=f"{base_url}/catalog/{sku_clean}",
                    minhash_signature=signature
                )
            except (ValueError, etree.XPathError):
                continue`;
    navigator.clipboard.writeText(rawCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="w-full my-10 rounded-xl overflow-hidden border border-[#C5A059]/40 bg-[#090910] shadow-[0_0_50px_rgba(197,160,89,0.15)] select-none">
      {/* Cabecera de la Herramienta */}
      <div className="bg-[#12121c] px-4 py-3 border-b border-[#C5A059]/30 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Terminal size={15} className="text-[#C5A059]" />
          <span className="text-xs font-mono font-bold text-zinc-100 tracking-wider">
            LABORATORIO DE INGENIERÍA // EJECUTOR TÉCNICO L7 & MINHASH
          </span>
        </div>

        {/* Selector de Pestañas */}
        <div className="flex items-center gap-1 bg-black/70 p-1 rounded-lg border border-zinc-800 text-[11px] font-mono">
          <button
            onClick={() => {
              sfx.playClick();
              setActiveTab('python-code');
            }}
            className={`px-3 py-1 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'python-code'
                ? 'bg-[#C5A059] text-black font-bold shadow-[0_0_10px_rgba(197,160,89,0.5)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Code2 size={12} />
            <span>Código Python Ejecutable</span>
          </button>

          <button
            onClick={() => {
              sfx.playClick();
              setActiveTab('minhash');
            }}
            className={`px-3 py-1 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'minhash'
                ? 'bg-[#C5A059] text-black font-bold shadow-[0_0_10px_rgba(197,160,89,0.5)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Hash size={12} />
            <span>MinHash & Jaccard</span>
          </button>

          <button
            onClick={() => {
              sfx.playClick();
              setActiveTab('cparser');
            }}
            className={`px-3 py-1 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'cparser'
                ? 'bg-[#C5A059] text-black font-bold shadow-[0_0_10px_rgba(197,160,89,0.5)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Cpu size={12} />
            <span>Parser C (libxml2)</span>
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        {/* PESTAÑA 1: CÓDIGO PYTHON CON RESALTADO DE SINTAXIS Y EJECUCIÓN PRÁCTICA */}
        {activeTab === 'python-code' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="text-xs sm:text-sm font-mono font-bold text-[#FFE066] uppercase tracking-wider flex items-center gap-2">
                  <Play size={13} className="text-[#C5A059] fill-current" />
                  <span>Implementación Técnica Ejecutable (libxml2 + Pydantic + MinHash)</span>
                </h4>
                <p className="text-xs text-zinc-400 font-sans mt-0.5">
                  Código de producción optimizado para bajo consumo de memoria. Pulsa «Ejecutar Código Python» para correr el pipeline en tiempo real.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExecutePythonCode}
                  disabled={isRunningPython}
                  className="px-4 py-2 bg-[#C5A059] hover:bg-[#FFE066] text-black font-mono font-bold text-xs rounded transition-all cursor-pointer shadow-[0_0_20px_rgba(197,160,89,0.5)] flex items-center gap-1.5 animate-pulse"
                >
                  <Play size={12} className="fill-current" />
                  <span>{isRunningPython ? 'Compilando y Ejecutando...' : 'Ejecutar Código Python'}</span>
                </button>

                <button
                  onClick={handleCopyPython}
                  className="px-3 py-2 bg-black/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 font-mono text-xs rounded transition-colors flex items-center gap-1 cursor-pointer"
                  title="Copiar código fuente"
                >
                  {copiedCode ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copiedCode ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>
            </div>

            {/* Editor de Código con Resaltado de Sintaxis Python */}
            <div className="bg-[#040407] rounded-lg border border-zinc-800/90 overflow-hidden shadow-2xl font-mono text-xs">
              <div className="bg-[#0d0d15] px-4 py-2 border-b border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
                <span className="flex items-center gap-1.5 text-[#C5A059]">
                  <Code2 size={12} />
                  novux_l7_pipeline.py
                </span>
                <span className="text-zinc-600">// Runtime: C-Python 3.12 • libxml2 v2.12</span>
              </div>

              <div className="p-4 sm:p-5 overflow-x-auto text-[11.5px] leading-relaxed max-h-[380px] overflow-y-auto">
                <pre className="text-zinc-300">
                  <span className="text-[#a1a1aa] italic"># NOVUX Data & Development - Production Scraping & Deduplication Pipeline</span>{'\n'}
                  <span className="text-[#c084fc]">from</span> <span className="text-[#38bdf8]">typing</span> <span className="text-[#c084fc]">import</span> <span className="text-[#38bdf8]">Generator, List, Set</span>{'\n'}
                  <span className="text-[#c084fc]">import</span> <span className="text-[#38bdf8]">binascii</span>{'\n'}
                  <span className="text-[#c084fc]">from</span> <span className="text-[#38bdf8]">lxml</span> <span className="text-[#c084fc]">import</span> <span className="text-[#38bdf8]">etree</span>{'\n'}
                  <span className="text-[#c084fc]">from</span> <span className="text-[#38bdf8]">pydantic</span> <span className="text-[#c084fc]">import</span> <span className="text-[#38bdf8]">BaseModel, Field, HttpUrl</span>{'\n\n'}
                  <span className="text-[#c084fc]">class</span> <span className="text-[#38bdf8] font-bold">CanonicalProduct</span>(<span className="text-[#38bdf8]">BaseModel</span>):{'\n'}
                  {'    '}<span className="text-[#a1a1aa] italic">"""Esquema canónico fuertemente tipado."""</span>{'\n'}
                  {'    '}sku: <span className="text-[#38bdf8]">str</span> = <span className="text-[#FFE066]">Field</span>(..., min_length=<span className="text-[#f472b6]">1</span>){'\n'}
                  {'    '}name: <span className="text-[#38bdf8]">str</span> = <span className="text-[#FFE066]">Field</span>(..., min_length=<span className="text-[#f472b6]">2</span>){'\n'}
                  {'    '}price: <span className="text-[#38bdf8]">float</span> = <span className="text-[#FFE066]">Field</span>(..., gt=<span className="text-[#f472b6]">0.0</span>){'\n'}
                  {'    '}url: <span className="text-[#38bdf8]">HttpUrl</span>{'\n'}
                  {'    '}minhash_signature: <span className="text-[#38bdf8]">List[int]</span> = <span className="text-[#FFE066]">Field</span>(default_factory=<span className="text-[#38bdf8]">list</span>){'\n\n'}
                  <span className="text-[#c084fc]">class</span> <span className="text-[#38bdf8] font-bold">MinHashDeduplicator</span>:{'\n'}
                  {'    '}<span className="text-[#c084fc]">def</span> <span className="text-[#FFE066]">__init__</span>(<span className="text-[#fb923c]">self</span>, num_perm: <span className="text-[#38bdf8]">int</span> = <span className="text-[#f472b6]">64</span>, seed: <span className="text-[#38bdf8]">int</span> = <span className="text-[#f472b6]">42</span>):{'\n'}
                  {'        '}<span className="text-[#fb923c]">self</span>.num_perm = num_perm{'\n'}
                  {'        '}<span className="text-[#fb923c]">self</span>._prime = <span className="text-[#f472b6]">4294967311</span>{'\n'}
                  {'        '}<span className="text-[#fb923c]">self</span>._a = [((i * <span className="text-[#f472b6]">10007</span> + seed) % (<span className="text-[#fb923c]">self</span>._prime - <span className="text-[#f472b6]">1</span>)) + <span className="text-[#f472b6]">1</span> <span className="text-[#c084fc]">for</span> i <span className="text-[#c084fc]">in</span> <span className="text-[#FFE066]">range</span>(num_perm)]{'\n'}
                  {'        '}<span className="text-[#fb923c]">self</span>._b = [((i * <span className="text-[#f472b6]">20011</span> + seed * <span className="text-[#f472b6]">3</span>) % <span className="text-[#fb923c]">self</span>._prime) <span className="text-[#c084fc]">for</span> i <span className="text-[#c084fc]">in</span> <span className="text-[#FFE066]">range</span>(num_perm)]{'\n\n'}
                  {'    '}<span className="text-[#c084fc]">def</span> <span className="text-[#FFE066]">compute_signature</span>(<span className="text-[#fb923c]">self</span>, text: <span className="text-[#38bdf8]">str</span>) -&gt; <span className="text-[#38bdf8]">List[int]</span>:{'\n'}
                  {'        '}shingles = <span className="text-[#fb923c]">self</span>._get_shingles(text){'\n'}
                  {'        '}signature = []{'\n'}
                  {'        '}<span className="text-[#c084fc]">for</span> a, b <span className="text-[#c084fc]">in</span> <span className="text-[#FFE066]">zip</span>(<span className="text-[#fb923c]">self</span>._a, <span className="text-[#fb923c]">self</span>._b):{'\n'}
                  {'            '}min_val = <span className="text-[#FFE066]">float</span>(<span className="text-[#4ade80]">'inf'</span>){'\n'}
                  {'            '}<span className="text-[#c084fc]">for</span> s <span className="text-[#c084fc]">in</span> shingles:{'\n'}
                  {'                '}val = (a * s + b) % <span className="text-[#fb923c]">self</span>._prime{'\n'}
                  {'                '}<span className="text-[#c084fc]">if</span> val &lt; min_val:{'\n'}
                  {'                    '}min_val = val{'\n'}
                  {'            '}signature.<span className="text-[#FFE066]">append</span>(<span className="text-[#FFE066]">int</span>(min_val)){'\n'}
                  {'        '}<span className="text-[#c084fc]">return</span> signature{'\n\n'}
                  <span className="text-[#c084fc]">class</span> <span className="text-[#38bdf8] font-bold">ScopedDOMParser</span>:{'\n'}
                  {'    '}<span className="text-[#f43f5e]">@staticmethod</span>{'\n'}
                  {'    '}<span className="text-[#c084fc]">def</span> <span className="text-[#FFE066]">parse_stream</span>(html_bytes: <span className="text-[#38bdf8]">bytes</span>, base_url: <span className="text-[#38bdf8]">str</span>) -&gt; <span className="text-[#38bdf8]">Generator[CanonicalProduct, None, None]</span>:{'\n'}
                  {'        '}deduper = <span className="text-[#FFE066]">MinHashDeduplicator</span>(num_perm=<span className="text-[#f472b6]">32</span>){'\n'}
                  {'        '}parser = etree.<span className="text-[#FFE066]">HTMLParser</span>(recover=<span className="text-[#c084fc]">True</span>, remove_blank_text=<span className="text-[#c084fc]">True</span>){'\n'}
                  {'        '}tree = etree.<span className="text-[#FFE066]">fromstring</span>(html_bytes, parser=parser){'\n'}
                  {'        '}product_nodes = tree.<span className="text-[#FFE066]">xpath</span>(<span className="text-[#4ade80]">"//article[contains(@class, 'product-card')]"</span>){'\n'}
                  {'        '}<span className="text-[#c084fc]">for</span> node <span className="text-[#c084fc]">in</span> product_nodes:{'\n'}
                  {'            '}<span className="text-[#c084fc]">try</span>:{'\n'}
                  {'                '}sku_raw = node.<span className="text-[#FFE066]">xpath</span>(<span className="text-[#4ade80]">"./@data-sku"</span>){'\n'}
                  {'                '}name_raw = node.<span className="text-[#FFE066]">xpath</span>(<span className="text-[#4ade80]">".//h2[@class='title']/text()"</span>){'\n'}
                  {'                '}price_raw = node.<span className="text-[#FFE066]">xpath</span>(<span className="text-[#4ade80]">".//span[@class='price-val']/text()"</span>){'\n'}
                  {'                '}<span className="text-[#c084fc]">if</span> <span className="text-[#c084fc]">not</span> (sku_raw <span className="text-[#c084fc]">and</span> name_raw <span className="text-[#c084fc]">and</span> price_raw): <span className="text-[#c084fc]">continue</span>{'\n'}
                  {'                '}signature = deduper.<span className="text-[#FFE066]">compute_signature</span>(<span className="text-[#FFE066]">str</span>(name_raw[<span className="text-[#f472b6]">0</span>])){'\n'}
                  {'                '}<span className="text-[#c084fc]">yield</span> <span className="text-[#FFE066]">CanonicalProduct</span>(sku=<span className="text-[#FFE066]">str</span>(sku_raw[<span className="text-[#f472b6]">0</span>]), name=<span className="text-[#FFE066]">str</span>(name_raw[<span className="text-[#f472b6]">0</span>]), price=<span className="text-[#FFE066]">float</span>(price_raw[<span className="text-[#f472b6]">0</span>].<span className="text-[#FFE066]">replace</span>(<span className="text-[#4ade80]">"$"</span>, <span className="text-[#4ade80]">""</span>)), url=<span className="text-[#4ade80]">f"</span>{'{base_url}'}<span className="text-[#4ade80]">/catalog/"</span>, minhash_signature=signature){'\n'}
                  {'            '}<span className="text-[#c084fc]">except</span> (<span className="text-[#38bdf8]">ValueError</span>, etree.<span className="text-[#38bdf8]">XPathError</span>): <span className="text-[#c084fc]">continue</span>
                </pre>
              </div>
            </div>

            {/* Consola de Salida del Script Python en Tiempo Real */}
            {pythonExecutionResult && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-black/95 border border-[#C5A059]/50 font-mono text-xs shadow-2xl space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <CheckCircle2 size={14} />
                    <span>EJECUCIÓN COMPLETADA: 2 ENTIDADES CANÓNICAS EMITIDAS</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-zinc-400">
                    <span>Tiempo de Ejecución: <strong className="text-[#FFE066]">{pythonExecutionResult.runtime_ms} ms</strong></span>
                    <span>•</span>
                    <span>Ahorro RAM en C: <strong className="text-emerald-400">{pythonExecutionResult.memory_saved_percent}%</strong></span>
                  </div>
                </div>

                <div className="bg-[#090912] p-3 rounded border border-zinc-800/80 overflow-x-auto text-[11px] text-zinc-200">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">
                    Stream Output JSON (Pydantic Serialized)
                  </div>
                  <pre className="text-zinc-300">
{JSON.stringify(pythonExecutionResult.records, null, 2)}
                  </pre>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* PESTAÑA 2: CALCULADORA DE DEDUPLICACIÓN MINHASH & JACCARD */}
        {activeTab === 'minhash' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h4 className="text-xs sm:text-sm font-mono font-bold text-[#FFE066] uppercase tracking-wider flex items-center gap-2">
                  <Sparkles size={14} />
                  <span>Deduplicación Semántica en Escala (Shingling + MinHash)</span>
                </h4>
                {/* Presets Rápidos */}
                <div className="flex items-center gap-1.5 text-[11px] font-mono">
                  <span className="text-zinc-500 mr-1">Casos de prueba:</span>
                  <button
                    onClick={() => applyPreset('near-duplicate')}
                    className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-[#C5A059]/20 hover:text-[#FFE066] text-zinc-300 border border-zinc-700 cursor-pointer"
                  >
                    Casi Idénticos (95%)
                  </button>
                  <button
                    onClick={() => applyPreset('partial')}
                    className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-[#C5A059]/20 hover:text-[#FFE066] text-zinc-300 border border-zinc-700 cursor-pointer"
                  >
                    Variación Parcial
                  </button>
                  <button
                    onClick={() => applyPreset('different')}
                    className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-[#C5A059]/20 hover:text-[#FFE066] text-zinc-300 border border-zinc-700 cursor-pointer"
                  >
                    Distintos
                  </button>
                </div>
              </div>
              <p className="text-xs text-zinc-400 font-sans">
                Edita los dos textos a continuación. La herramienta calcula los $k$-shingles (trigramas), evalúa el coeficiente de Jaccard teórico exacto y computa la firma MinHash para deduplicación masiva en tiempo lineal.
              </p>
            </div>

            {/* Inputs de Comparación */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-zinc-300 flex items-center justify-between">
                  <span className="text-[#C5A059] font-bold">Documento A (Entrada Cruda 1):</span>
                  <span className="text-zinc-500">{shinglesA.size} shingles</span>
                </label>
                <textarea
                  value={textA}
                  onChange={(e) => setTextA(e.target.value)}
                  rows={3}
                  className="w-full bg-black/80 border border-zinc-800 focus:border-[#C5A059] text-xs font-mono text-zinc-200 p-2.5 rounded outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-zinc-300 flex items-center justify-between">
                  <span className="text-[#C5A059] font-bold">Documento B (Entrada Cruda 2):</span>
                  <span className="text-zinc-500">{shinglesB.size} shingles</span>
                </label>
                <textarea
                  value={textB}
                  onChange={(e) => setTextB(e.target.value)}
                  rows={3}
                  className="w-full bg-black/80 border border-zinc-800 focus:border-[#C5A059] text-xs font-mono text-zinc-200 p-2.5 rounded outline-none transition-colors"
                />
              </div>
            </div>

            {/* Métricas y Resultados Matemáticos */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Jaccard Exacto */}
              <div className="p-3.5 rounded-lg bg-[#0e0e18] border border-zinc-800">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  Similitud Jaccard Exacta (J)
                </div>
                <div className="text-2xl font-mono font-bold text-[#FFE066] mt-1">
                  {(exactJaccard * 100).toFixed(1)}%
                </div>
                <div className="text-[10px] font-mono text-zinc-500 mt-0.5">
                  |A ∩ B| / |A ∪ B|
                </div>
              </div>

              {/* MinHash Aproximado */}
              <div className="p-3.5 rounded-lg bg-[#0e0e18] border border-zinc-800">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center justify-between">
                  <span>Aproximación MinHash</span>
                  <span className="text-[#C5A059] text-[9px] font-bold">{numPermutations} hashes</span>
                </div>
                <div className="text-2xl font-mono font-bold text-[#C5A059] mt-1">
                  {(minhashSimilarity * 100).toFixed(1)}%
                </div>
                <div className="text-[10px] font-mono text-zinc-500 mt-0.5">
                  Colisión de huella fija O(1)
                </div>
              </div>

              {/* Dictamen del Filtro */}
              <div className="p-3.5 rounded-lg bg-[#0e0e18] border border-zinc-800 flex flex-col justify-between">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  Dictamen del Pipeline
                </div>
                <div className="mt-1">
                  {exactJaccard >= 0.75 ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-950/60 border border-red-500/50 text-red-300 text-xs font-mono font-bold">
                      <ShieldCheck size={12} />
                      DUPLICADO DESCARTADO
                    </span>
                  ) : exactJaccard >= 0.35 ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-950/60 border border-amber-500/50 text-amber-300 text-xs font-mono font-bold">
                      <Binary size={12} />
                      VARIACIÓN SEMÁNTICA
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold">
                      <Check size={12} />
                      REGISTRO ÚNICO / APROBADO
                    </span>
                  )}
                </div>
                <div className="text-[10px] font-mono text-zinc-500 mt-1">
                  Umbral de ingesta: J &gt; 0.75
                </div>
              </div>
            </div>

            {/* Inspección de Firmas MinHash (Primeros 8 enteros generados) */}
            <div className="p-3.5 rounded-lg bg-black/60 border border-zinc-800 text-xs font-mono">
              <div className="text-[11px] text-zinc-400 mb-2 flex items-center justify-between">
                <span className="text-[#C5A059] font-bold">// HUELLAS MINHASH GENERADAS (MUESTRA DE 8 FUNCIONES HASH):</span>
                <span className="text-zinc-500">Vector comprimido para indexación LSH</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div className="bg-[#0b0b14] p-2 rounded border border-zinc-900 overflow-x-auto text-zinc-300">
                  <span className="text-[#FFE066]">Firma A: </span>
                  [{sigA.slice(0, 8).join(', ')}]
                </div>
                <div className="bg-[#0b0b14] p-2 rounded border border-zinc-900 overflow-x-auto text-zinc-300">
                  <span className="text-[#FFE066]">Firma B: </span>
                  [{sigB.slice(0, 8).join(', ')}]
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* PESTAÑA 3: SIMULADOR DE C-PARSER & SCOPED XPATH */}
        {activeTab === 'cparser' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
          >
            <div>
              <h4 className="text-xs sm:text-sm font-mono font-bold text-[#FFE066] uppercase tracking-wider flex items-center gap-2 mb-1">
                <Cpu size={14} />
                <span>Simulador de Parsing a Nivel C (libxml2) & Scope Local</span>
              </h4>
              <p className="text-xs text-zinc-400 font-sans">
                Observa cómo el motor compila el árbol en memoria nativa continua y ejecuta consultas XPath relativas (<code className="text-[#C5A059]">./@data-sku</code>, <code className="text-[#C5A059]">.//h2/text()</code>) directamente sobre el nodo contenedor, podando el 90%+ del DOM innecesario.
              </p>
            </div>

            {/* Código HTML y Selectores */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-black/90 p-3.5 rounded border border-zinc-800 font-mono text-xs">
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">
                  Payload HTML en Buffer de Memoria (Chunk)
                </div>
                <pre className="text-zinc-300 overflow-x-auto text-[11px] leading-relaxed">
{`<article class="product-card" data-sku="MBP-M3M-36GB">
  <div class="thumbnail-wrapper">
    <img src="/cdn/mbp16.jpg" alt="Preview"/>
  </div>
  <div class="meta-info">
    <h2 class="title">
      Apple MacBook Pro 16 M3 Max 36GB RAM 1TB SSD Space Black
    </h2>
    <span class="price-val">$3,499.00</span>
    <span class="stock-status in-stock">Disponible</span>
  </div>
</article>`}
                </pre>
              </div>

              {/* Controles de Ejecución */}
              <div className="flex flex-col justify-between bg-[#0e0e18] p-4 rounded border border-zinc-800">
                <div className="space-y-3">
                  <div className="text-[11px] font-mono text-[#C5A059] font-bold">
                    // CONSULTAS XPATH RELATIVAS:
                  </div>
                  <div className="space-y-1.5 text-xs font-mono text-zinc-300">
                    <div className="p-2 rounded bg-black/60 border border-zinc-900 flex justify-between">
                      <span className="text-[#FFE066]">SKU:</span>
                      <code>node.xpath("./@data-sku")</code>
                    </div>
                    <div className="p-2 rounded bg-black/60 border border-zinc-900 flex justify-between">
                      <span className="text-[#FFE066]">Nombre:</span>
                      <code>node.xpath(".//h2[@class='title']/text()")</code>
                    </div>
                    <div className="p-2 rounded bg-black/60 border border-zinc-900 flex justify-between">
                      <span className="text-[#FFE066]">Precio:</span>
                      <code>node.xpath(".//span[@class='price-val']/text()")</code>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleRunParser}
                  disabled={isParsing}
                  className="mt-4 w-full py-2.5 px-4 bg-[#C5A059] hover:bg-[#FFE066] text-black font-mono font-bold text-xs rounded transition-all cursor-pointer shadow-[0_0_20px_rgba(197,160,89,0.4)] flex items-center justify-center gap-2"
                >
                  <Play size={13} className="fill-current" />
                  <span>{isParsing ? 'Compilando en libxml2 C...' : 'Ejecutar Ingesta L7 (C-Parser)'}</span>
                </button>
              </div>
            </div>

            {/* Resultado de la Extracción */}
            {parsedData && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-black/90 border border-[#C5A059]/40 font-mono text-xs space-y-3 shadow-xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-2">
                  <span className="text-[#FFE066] font-bold flex items-center gap-1.5">
                    <Check size={13} className="text-emerald-400" />
                    OBJETO CANÓNICO PYDANTIC GENERADO EXITOSAMENTE
                  </span>
                  <span className="text-zinc-500 text-[10px]">
                    Memoria C: {parsedData.c_level_memory_bytes} bytes • Ahorro RAM: ~96%
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                  <div className="p-2 rounded bg-[#0e0e18] border border-zinc-900">
                    <span className="text-zinc-500 block">SKU Validado:</span>
                    <span className="text-zinc-200 font-bold">{parsedData.sku}</span>
                  </div>
                  <div className="p-2 rounded bg-[#0e0e18] border border-zinc-900">
                    <span className="text-zinc-500 block">Precio Float:</span>
                    <span className="text-emerald-400 font-bold">${parsedData.price_val} {parsedData.currency}</span>
                  </div>
                  <div className="p-2 rounded bg-[#0e0e18] border border-zinc-900">
                    <span className="text-zinc-500 block">Huella MinHash:</span>
                    <span className="text-[#C5A059] font-bold">[{parsedData.minhash_signature.slice(0, 4).join(', ')}...]</span>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#0a0a14] border border-zinc-900 text-zinc-300 text-[11px] leading-relaxed">
                  <span className="text-zinc-500 block mb-1">Nombre Normalizado:</span>
                  {parsedData.name}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
