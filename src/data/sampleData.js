export const sampleAnalyses = [
  {
    id: "scan-9021",
    title: "Scientists Claim New Super-Berry Reverses Human Cellular Aging by 20 Years Within 48 Hours",
    url: "https://viralhealthdaily.org/breakthrough-aging-cure-berry-trial",
    source: "Viral Health Daily",
    domain: "viralhealthdaily.org",
    author: "Dr. Marcus Vance (Unverified)",
    date: "2 hours ago",
    category: "Health & Science",
    trustScore: 18,
    verdict: "High Risk - Fabrication & Clickbait",
    verdictType: "false", // false, warning, verified, mixed
    summary: "The article presents sensationalized claims regarding an undiscovered tropical berry compound called 'CelluRevive-9' that supposedly rejuvenates human cells in 48 hours. No peer-reviewed publications, clinical trial registry numbers, or institutional affiliations exist.",
    confidence: 0.94,
    metrics: {
      sourceReliability: 12,
      evidenceQuality: 15,
      biasScore: 89,
      clickbaitIndex: 96
    },
    flags: [
      "No peer-reviewed citations",
      "Fabricated clinical trial data",
      "Emotional & urgent language",
      "Known affiliate marketing network"
    ],
    claims: [
      {
        id: "c1",
        claimText: "Double-blind clinical study with 10,000 subjects proved full reversal of mitochondrial decay in 48 hours.",
        status: "False",
        statusType: "false",
        evidence: "Search across PubMed, ClinicalTrials.gov, and NIH registries returned zero records for any study matching this title, author, or chemical entity.",
        sources: ["PubMed Central", "NIH Clinical Database"]
      },
      {
        id: "c2",
        claimText: "Compound approved by the Global Health Advisory Board for anti-aging therapy.",
        status: "Fabricated Entity",
        statusType: "false",
        evidence: "The 'Global Health Advisory Board' is a fictitious entity commonly cited in deceptive supplement marketing schemes.",
        sources: ["WHO Directory of Accredited Agencies"]
      },
      {
        id: "c3",
        claimText: "Contains concentrated anthocyanin antioxidants.",
        status: "Misleading Context",
        statusType: "warning",
        evidence: "Anthocyanins are real antioxidants found in blueberries and blackberries, but there is no scientific consensus that oral intake can reverse human aging in days.",
        sources: ["Harvard Health Publishing", "The Lancet Healthy Longevity"]
      }
    ],
    aiExplanation: "TruthLens analyzed the syntactic structure, author credentials, domain reputation history, and cross-referenced statement assertions against international biomedical databases. The article exhibits extreme sensationalist markers ('Miracle Breakthrough', 'Banned by Big Pharma'), lacks verifiable DOIs, and the publishing domain was registered just 19 days ago.",
    reputableCoverage: [
      {
        outlet: "Reuters Health Fact Check",
        verdict: "Pants on Fire / False",
        url: "https://reuters.com/fact-check"
      },
      {
        outlet: "PolitiFact Health",
        verdict: "False",
        url: "https://politifact.com"
      }
    ]
  },
  {
    id: "scan-9022",
    title: "European Space Agency Confirms Successful Deployment of Sentinel-7 Carbon Monitoring Satellite",
    url: "https://nature.com/articles/esa-sentinel-7-deployment-success",
    source: "Nature International Journal",
    domain: "nature.com",
    author: "Editorial Board / Science Wire",
    date: "4 hours ago",
    category: "Science & Technology",
    trustScore: 96,
    verdict: "Highly Credible — Corroborated by Primary Sources",
    verdictType: "verified",
    summary: "ESA in collaboration with NASA and Copernicus Earth Observation Programme confirmed the orbital stabilization of Sentinel-7, carrying hyperspectral greenhouse gas spectrometers.",
    confidence: 0.98,
    metrics: {
      sourceReliability: 98,
      evidenceQuality: 95,
      biasScore: 6,
      clickbaitIndex: 4
    },
    flags: [
      "Primary telemetry data linked",
      "Named institutional spokespeople",
      "Direct press release cross-referenced",
      "Peer-reviewed editorial standards"
    ],
    claims: [
      {
        id: "c1",
        claimText: "Sentinel-7 entered designated Sun-synchronous orbit at altitude 705 km at 06:42 UTC.",
        status: "Verified True",
        statusType: "verified",
        evidence: "Confirmed by ESA Mission Control telemetry feed and US Space Command orbital tracking catalog.",
        sources: ["ESA Mission Flight Operations", "Celestrak TLE Catalog"]
      },
      {
        id: "c2",
        claimText: "Instruments will map methane plumes with 20m spatial resolution across global industrial hubs.",
        status: "Verified True",
        statusType: "verified",
        evidence: "Instrument payload specifications are documented in ESA Technical Memorandums published in 2024.",
        sources: ["ESA Scientific Publications", "Copernicus Program"]
      }
    ],
    aiExplanation: "Content originates from a gold-standard scientific publisher. Multiple institutional press releases and aerospace tracking services independently verify all chronological, spatial, and technical claims.",
    reputableCoverage: [
      {
        outlet: "Associated Press",
        verdict: "Verified Factual",
        url: "https://apnews.com"
      },
      {
        outlet: "BBC Science",
        verdict: "Corroborated",
        url: "https://bbc.com/news/science"
      }
    ]
  },
  {
    id: "scan-9023",
    title: "Viral Video Claims Electric Vehicles Generate 10x More Lifetime Emissions Than Diesel Sedans",
    url: "https://socialtrendpulse.net/ev-emissions-diesel-comparison-leak",
    source: "Social Trend Pulse",
    domain: "socialtrendpulse.net",
    author: "TechObserver99",
    date: "Yesterday",
    category: "Environment & Energy",
    trustScore: 41,
    verdict: "Misleading Context — Cherry-picked Calculations",
    verdictType: "warning",
    summary: "The video report cites an outdated 2017 preliminary study while omitting modern battery manufacturing efficiencies and clean energy grid transitions. Misrepresents lifetime lifecycle emissions.",
    confidence: 0.89,
    metrics: {
      sourceReliability: 35,
      evidenceQuality: 42,
      biasScore: 78,
      clickbaitIndex: 82
    },
    flags: [
      "Outdated 2017 study cited out of context",
      "Omits battery recycling & grid decarbonization",
      "Selective quote trimming"
    ],
    claims: [
      {
        id: "c1",
        claimText: "Mining lithium causes 10 times more pollution than 15 years of diesel combustion.",
        status: "Misleading",
        statusType: "warning",
        evidence: "Multiple life cycle assessments (LCA) from MIT, ICCT, and Argonne National Lab demonstrate EVs produce 50-70% fewer lifetime emissions than equivalent diesel cars even on fossil-heavy grids.",
        sources: ["MIT Energy Initiative", "International Council on Clean Transportation (ICCT)"]
      },
      {
        id: "c2",
        claimText: "Batteries cannot be recycled and must be buried permanently in toxic landfills.",
        status: "False",
        statusType: "false",
        evidence: "Commercial hydrometallurgical recycling facilities recover over 95% of battery-grade lithium, nickel, and cobalt under current EU and US regulations.",
        sources: ["US Department of Energy", "Nature Energy"]
      }
    ],
    aiExplanation: "The narrative leverages genuine concerns regarding mineral extraction to craft an exaggerated, scientifically inaccurate conclusion by ignoring life cycle assessments and updated industrial recovery metrics.",
    reputableCoverage: [
      {
        outlet: "FactCheck.org",
        verdict: "Misleading",
        url: "https://factcheck.org"
      },
      {
        outlet: "Snopes Fact Check",
        verdict: "Mostly False",
        url: "https://snopes.com"
      }
    ]
  },
  {
    id: "scan-9024",
    title: "Global Central Bank Alliance Announces Pilot Program for Interbank Digital Settlement Framework",
    url: "https://financialtimes.com/content/central-banks-digital-settlement-trial",
    source: "Financial Times",
    domain: "ft.com",
    author: "Sarah Jenkins & Michael Chen",
    date: "1 day ago",
    category: "Finance & Economy",
    trustScore: 94,
    verdict: "Verified Authentic",
    verdictType: "verified",
    summary: "The Bank for International Settlements (BIS) and six participating central banks unveiled Project Agora, exploring wholesale cross-border tokenized deposits with commercial financial institutions.",
    confidence: 0.97,
    metrics: {
      sourceReliability: 96,
      evidenceQuality: 92,
      biasScore: 8,
      clickbaitIndex: 10
    },
    flags: [
      "Attributed statements from BIS general managers",
      "Official policy whitepaper cited",
      "Zero hyperbole or unsubstantiated projections"
    ],
    claims: [
      {
        id: "c1",
        claimText: "Project Agora involves wholesale financial institutions and does not replace retail consumer cash.",
        status: "Verified True",
        statusType: "verified",
        evidence: "BIS official communiqué confirms trial scope is strictly institutional wholesale settlement.",
        sources: ["Bank for International Settlements (BIS)", "Federal Reserve Board"]
      }
    ],
    aiExplanation: "Verified through official institutional press releases and multiple independent financial reporting agencies.",
    reputableCoverage: [
      {
        outlet: "Reuters Finance",
        verdict: "Confirmed",
        url: "https://reuters.com"
      },
      {
        outlet: "Bloomberg Markets",
        verdict: "Verified",
        url: "https://bloomberg.com"
      }
    ]
  }
];

export const sampleSources = [
  {
    domain: "reuters.com",
    name: "Reuters",
    category: "Mainstream News",
    trustRating: "Very High",
    score: 98,
    bias: "Center",
    factCheckHistory: "Gold Standard editorial accountability with transparent correction logs.",
    ownership: "Thomson Reuters Corporation"
  },
  {
    domain: "apnews.com",
    name: "Associated Press",
    category: "Wire Service",
    trustRating: "Very High",
    score: 97,
    bias: "Center",
    factCheckHistory: "Direct non-profit cooperative reporting, founding member of IFCN.",
    ownership: "The Associated Press Cooperative"
  },
  {
    domain: "nature.com",
    name: "Nature Publishing Group",
    category: "Scientific Journal",
    trustRating: "Exceptional",
    score: 99,
    bias: "Scientific Consensus",
    factCheckHistory: "Rigorous double-blind peer review process with open data requirements.",
    ownership: "Springer Nature"
  },
  {
    domain: "viralhealthdaily.org",
    name: "Viral Health Daily",
    category: "Alternative / Blog",
    trustRating: "Very Low",
    score: 14,
    bias: "Extreme Sensationalism",
    factCheckHistory: "Repeatedly flagged for fabricated medical cures and affiliate click-funnels.",
    ownership: "Anonymous / Privacy-shielded Registrant"
  },
  {
    domain: "theonion.com",
    name: "The Onion",
    category: "Satire & Parody",
    trustRating: "Satire",
    score: 75,
    bias: "Satirical Humor",
    factCheckHistory: "Explicitly labeled satirical entertainment; occasionally misconstrued by automated crawlers.",
    ownership: "Global Tetrahedron"
  },
  {
    domain: "dailywire.com",
    name: "The Daily Wire",
    category: "Political Commentary",
    trustRating: "Mixed",
    score: 62,
    bias: "Right",
    factCheckHistory: "Strong editorial bias with occasional selective omission of dissenting facts.",
    ownership: "Daily Wire LLC"
  },
  {
    domain: "msnbc.com",
    name: "MSNBC",
    category: "Cable News / Commentary",
    trustRating: "Moderate",
    score: 71,
    bias: "Left",
    factCheckHistory: "Factual reporting in daytime wire coverage, partisan opinion framing in evening broadcasts.",
    ownership: "NBCUniversal"
  }
];

export const sampleStats = {
  totalScanned: "1,492",
  misinformationRate: "22.8%",
  verifiedAccurate: "64.2%",
  avgAnalysisTime: "180ms",
  activeModel: "Ollama LLaMA 3 (8B Local)"
};
