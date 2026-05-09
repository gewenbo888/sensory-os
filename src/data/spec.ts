// Canonical Civilization OS Ecosystem spec — consumed by all 11 sites.
// Each system has: id, slug, agent, name, oneLine, body, modules[], dataModel{}, apis[], equations[], hue, glyph.
// Bilingual content: every string is { en, zh }.

export type Bilingual = { en: string; zh: string };

export type Module = {
  id: string;
  name: Bilingual;
  body: Bilingual;
};

export type APIInterface = {
  to: string;            // target system id
  contract: Bilingual;   // human-readable contract
  signature: string;     // pseudo-code signature
};

export type Equation = {
  expr: string;          // LaTeX-flavored, single line
  caption: Bilingual;
};

export type System = {
  id: string;
  slug: string;          // subdomain prefix
  agent: Bilingual;      // "Agent N — role"
  name: Bilingual;
  glyph: string;
  hue: string;           // hex
  oneLine: Bilingual;
  body: Bilingual;       // 3-4 paragraphs
  modules: Module[];     // 4-6 modules
  dataModel: { name: Bilingual; fields: { key: string; type: string; note: Bilingual }[] };
  apis: APIInterface[];  // 3-5 outbound contracts
  equations: Equation[]; // 2-4 equations or principles
  uiScreens: Bilingual[];// names of example UI screens, 3-4
};

export const SYSTEMS: System[] = [
  // ──────────────────────────────────────────────────────────────────────
  {
    id: "civilization-os",
    slug: "civilization-os",
    agent: { en: "Agent 1 — Civilization Architect", zh: "Agent 1 — 文明架构师" },
    name: { en: "Civilization OS", zh: "文明操作系统" },
    glyph: "Ⅰ",
    hue: "#bd5d2c",
    oneLine: {
      en: "The macro civilization model. Population, energy, knowledge, coordination — modeled as one running system.",
      zh: "宏观文明模型。人口、能源、知识、协同——作为一个运行中的系统建模。",
    },
    body: {
      en: "Civilization OS is the top-level model of the ecosystem. It treats a civilization as a stack: substrate (geography, climate, biology) → infrastructure (energy, materials, transport) → coordination (institutions, money, law) → culture (ideas, narratives) → meta (reflection, course-correction). Every other system in this ecosystem is a deeper view into one slice of that stack. Civilization OS supplies the global ontology — the shared vocabulary every other system must speak. It does not do the simulation work itself; it routes and reconciles.",
      zh: "Civilization OS 是本生态系的最高层模型。它把一个文明视作分层栈：底层（地理、气候、生物）→ 基础设施（能源、材料、交通）→ 协同（制度、货币、法律）→ 文化（思想、叙事）→ 元层（反思、纠偏）。其他所有系统都是这一栈中某一切片的更深视图。Civilization OS 提供全局本体——所有其他系统都必须遵循的共享词汇。它本身不做模拟，而是路由与对账。",
    },
    modules: [
      { id: "ontology",     name: { en: "Ontology Registry",        zh: "本体注册表" },     body: { en: "Canonical entity types (Population, Resource, Institution, Idea, Cycle) shared across the ecosystem.",     zh: "跨生态共享的实体类型规范（Population、Resource、Institution、Idea、Cycle）。" } },
      { id: "stack-router", name: { en: "Stack Router",             zh: "栈路由器" },      body: { en: "Maps any query to the layer that owns it; passes through to the appropriate sub-system.",                  zh: "把任一查询映射到拥有它的层——并转发给相应的子系统。" } },
      { id: "ledger",       name: { en: "Civilizational Ledger",    zh: "文明账簿" },      body: { en: "Append-only event log of civilization-scale events: famine, treaty, breakthrough, collapse.",                zh: "追加式事件日志：饥荒、条约、突破、崩溃——皆以文明尺度记录。" } },
      { id: "stack-graph",  name: { en: "Stack Dependency Graph",   zh: "栈依赖图" },      body: { en: "Renders cross-layer dependencies; used by the meta-orchestrator for impact analysis.",                       zh: "呈现跨层依赖；元编排器据此做影响分析。" } },
      { id: "consensus",    name: { en: "Inter-System Consensus",   zh: "跨系统共识" },     body: { en: "Reconciles contradictory readings between sub-systems (e.g., Decision OS says X, Memetics says Y).",            zh: "调和子系统之间相互矛盾的判读（例如 Decision OS 说 X，Memetics 说 Y）。" } },
    ],
    dataModel: {
      name: { en: "Civilization", zh: "文明实体" },
      fields: [
        { key: "id",          type: "uuid",                          note: { en: "Globally unique civ instance id", zh: "全局唯一文明实例 id" } },
        { key: "epoch",       type: "Cycle.Phase",                   note: { en: "Current cycle phase (see Cycle Engine)", zh: "当前周期相位（见 Cycle Engine）" } },
        { key: "population",  type: "Life.Population",               note: { en: "Linked to Life OS",               zh: "与 Life OS 相联" } },
        { key: "energy",      type: "Material.EnergyBudget",         note: { en: "Linked to Material Civilization", zh: "与 Material Civilization 相联" } },
        { key: "ideology",    type: "Idea.MemeMix",                  note: { en: "Linked to Idea Evolution",        zh: "与 Idea Evolution 相联" } },
        { key: "institutions",type: "Decision.InstitutionGraph",     note: { en: "Linked to Decision OS",           zh: "与 Decision OS 相联" } },
      ],
    },
    apis: [
      { to: "idea-evolution",       contract: { en: "Subscribe to ideology drift events.",                  zh: "订阅意识形态漂移事件。" },                          signature: "GET /events/idea-drift?civ_id=…" },
      { to: "material-civilization",contract: { en: "Pull current energy budget and material stocks.",     zh: "拉取当前能源预算与材料库存。" },                      signature: "GET /civ/{id}/energy-budget" },
      { to: "decision-os",          contract: { en: "Submit institutional decisions for resolution.",      zh: "提交制度层面的决策待裁决。" },                        signature: "POST /decisions" },
      { to: "cycle-engine",         contract: { en: "Receive phase-transition notifications.",             zh: "接收周期相位转换通知。" },                            signature: "WS /cycles/{civ_id}" },
      { to: "life-os",              contract: { en: "Read demographic projections.",                       zh: "读取人口学预测。" },                                  signature: "GET /life/projection?civ_id=…" },
    ],
    equations: [
      { expr: "C(t) = f(P, E, K, I, M; phase_t)",                                                    caption: { en: "Civilization state as function of population, energy, knowledge, institutions, memes — modulated by phase.", zh: "文明状态为人口、能源、知识、制度、模因之函数——由相位调制。" } },
      { expr: "dC/dt = α·growth − β·decay + γ·shock",                                                caption: { en: "Net change is generative growth minus decay plus exogenous shock.",                                          zh: "净变化 = 生长 − 衰减 + 外生冲击。" } },
      { expr: "Resilience = Coordination × InstitutionalMemory × Redundancy",                       caption: { en: "Survival is multiplicative; any factor at zero collapses the product.",                                       zh: "生存为乘积——任一因子为零，整体即崩。" } },
    ],
    uiScreens: [
      { en: "Live civilization dashboard (population × energy × phase)", zh: "实时文明仪表盘（人口 × 能源 × 相位）" },
      { en: "Stack drill-down — pick layer, see modules",                zh: "栈下钻——选层，见模块" },
      { en: "Inter-system consensus log",                                zh: "跨系统共识日志" },
      { en: "Phase-aware impact tracer",                                 zh: "相位感知的影响追溯" },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    id: "idea-evolution",
    slug: "idea-evolution",
    agent: { en: "Agent 2 — Memetics Scientist", zh: "Agent 2 — 模因科学家" },
    name: { en: "Idea Evolution", zh: "思想演化" },
    glyph: "Ⅱ",
    hue: "#9b4422",
    oneLine: {
      en: "Memetics as evolutionary substrate. Ideas are organisms; minds are habitats; narratives are species.",
      zh: "把模因视作演化基质。思想是有机体——心智是栖境——叙事是物种。",
    },
    body: {
      en: "Idea Evolution treats culture as a population biology of memes. Each meme is a replicating pattern: a metaphor, a story arc, a slogan, a doctrine. Memes compete for cognitive surface area in human minds. They mutate (variations during retelling), recombine (mashups), and undergo selection (some retell, some don't). Narrative warfare is the deliberate cultivation of memes weaponized against rivals — propaganda, slogans, frames. The system models all of this as a directed graph in which nodes are memes and edges are causal lineage and substitution relations. The honest position: memetic models are descriptive, not prescriptive — they help diagnose how an idea is spreading, not whether it is true.",
      zh: "Idea Evolution 把文化视作模因的种群生物学。每个模因是一种可复制的模式：一个隐喻、一段故事弧、一句口号、一套教义。模因在人心的认知表面上彼此竞争。它们变异（每次复述都会变样）、重组（混搭）、被选择（有的被传下去，有的不被）。叙事战是刻意培育出针对对手的模因——宣传、口号、框架。系统将这些建模为有向图：节点是模因，边是因果传承与替代关系。诚实地讲：模因模型是描述性的、不是规范性的——它帮你诊断一个思想如何传播，而不是判断它是否为真。",
    },
    modules: [
      { id: "meme-graph",     name: { en: "Meme Graph",              zh: "模因图谱" },     body: { en: "Directed graph of memes, lineage, substitutions, hybridizations.",                                  zh: "模因的有向图——传承、替代、杂合。" } },
      { id: "fitness-index",  name: { en: "Fitness Index",           zh: "适应度指数" },    body: { en: "Composite of replicate-rate, retention, host-impact, infectivity.",                                  zh: "复合指标：复制率、留存率、宿主影响、感染性。" } },
      { id: "narrative-war",  name: { en: "Narrative Warfare Sim",   zh: "叙事战模拟" },    body: { en: "Models propaganda, frame contests, counter-narrative deployment.",                                  zh: "模拟宣传、框架之争、反向叙事部署。" } },
      { id: "channel-model",  name: { en: "Channel Model",           zh: "渠道模型" },     body: { en: "Carrier media (oral, print, broadcast, network) and how they shape which memes thrive.",            zh: "承载介质（口传、印刷、广播、网络）——以及它们如何决定哪些模因能繁盛。" } },
      { id: "extinction",     name: { en: "Extinction Predictor",    zh: "消亡预测器" },    body: { en: "Estimates which meme lineages are losing host-share fast enough to disappear.",                       zh: "估计哪些模因谱系正以足以消亡的速度失去宿主份额。" } },
    ],
    dataModel: {
      name: { en: "Meme", zh: "Meme（模因）" },
      fields: [
        { key: "id",          type: "uuid",          note: { en: "Meme id",                         zh: "模因 id" } },
        { key: "form",        type: "string",        note: { en: "Lexical form, slogan, image hash", zh: "词形、口号、图像哈希" } },
        { key: "parents",     type: "uuid[]",        note: { en: "Lineage — multiple ancestors allowed", zh: "传承——允许多祖先" } },
        { key: "fitness",     type: "float",         note: { en: "Fitness index 0..1",              zh: "适应度指数 0..1" } },
        { key: "channels",    type: "Channel[]",     note: { en: "Where it currently spreads",      zh: "当前传播渠道" } },
        { key: "host_share",  type: "float",         note: { en: "Approximate fraction of population carrying it", zh: "携带人口的近似比例" } },
      ],
    },
    apis: [
      { to: "civilization-os", contract: { en: "Push ideology drift events upward to civ ledger.",   zh: "将意识形态漂移事件上推至文明账簿。" },          signature: "POST /events/idea-drift" },
      { to: "decision-os",     contract: { en: "Provide narrative priors to a decision agent.",      zh: "为决策代理提供叙事先验。" },                    signature: "GET /priors?agent_id=…" },
      { to: "sensory-os",      contract: { en: "Receive perception-to-meme attribution data.",      zh: "接收『感知→模因』归因数据。" },                  signature: "POST /attributions" },
      { to: "cycle-engine",    contract: { en: "Subscribe to phase events that bias meme fitness.", zh: "订阅会影响模因适应度的相位事件。" },             signature: "WS /cycles/phase" },
    ],
    equations: [
      { expr: "F(meme) = r·R·H − d",                                                                     caption: { en: "Fitness ≈ retell-rate × retention × host-impact − decay.",                              zh: "适应度 ≈ 复述率 × 留存率 × 宿主影响 − 衰减。" } },
      { expr: "p(t+1) = p(t) + p(t)·(F − ⟨F⟩)·Δt",                                                       caption: { en: "Replicator dynamics: meme share grows in proportion to fitness above mean.",            zh: "复制者动力学：模因份额按高于均值的适应度增长。" } },
      { expr: "Mutation_rate ∝ 1 / Channel.fidelity",                                                    caption: { en: "Higher-fidelity channels (text > rumour) preserve form better.",                        zh: "高保真渠道（文本 > 口耳）更能保留形式。" } },
    ],
    uiScreens: [
      { en: "Meme genealogy graph (force-directed)",       zh: "模因家谱图（力导向）" },
      { en: "Fitness leaderboard by channel",              zh: "按渠道的适应度排行榜" },
      { en: "Narrative-warfare timeline overlay",          zh: "叙事战时间线叠加" },
      { en: "Extinction radar",                            zh: "消亡雷达" },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    id: "material-civilization",
    slug: "material-civilization",
    agent: { en: "Agent 3 — Materials & Energy Engineer", zh: "Agent 3 — 材料与能源工程师" },
    name: { en: "Material Civilization", zh: "物质文明" },
    glyph: "Ⅲ",
    hue: "#446ba0",
    oneLine: {
      en: "Atoms → energy → materials → tools → industry → power. Civilization is what its hardest material allows.",
      zh: "原子 → 能量 → 材料 → 工具 → 工业 → 权力。一个文明，止于它最硬的那种材料。",
    },
    body: {
      en: "Material Civilization models the physical substrate of human capability. It tracks the discovery and exploitation of materials (stone, bronze, iron, steel, silicon, lithium, rare-earths) and the energy regimes that make those materials usable (muscle, fire, water, coal, oil, electricity, fission, fusion). Each transition cascades: a new material enables new tools, which enable new institutions, which enable new energy capture, which enables new materials. Semiconductor civilization is the current frontier — silicon doping → integrated circuits → planetary computation. The honest position: material progress does not automatically produce social progress, but social progress without material progress decays.",
      zh: "Material Civilization 模型化人类能力的物质基底。它追踪材料的发现与利用（石、青铜、铁、钢、硅、锂、稀土），以及让这些材料可用的能源体制（肌、火、水、煤、油、电、裂变、聚变）。每一次跃迁皆会级联：新材料使新工具成为可能；新工具使新制度成为可能；新制度使新能源捕获成为可能；新能源使新材料成为可能。半导体文明是当前的前沿——硅掺杂 → 集成电路 → 星球计算。诚实地讲：物质进步不会自动带来社会进步——但失去物质进步的社会进步，会衰减。",
    },
    modules: [
      { id: "material-tree",   name: { en: "Material Tree",              zh: "材料树" },        body: { en: "Branching tech tree from raw element to finished good — every node has prerequisites.",          zh: "从原料元素到成品的分支工艺树——每节点皆有前置条件。" } },
      { id: "energy-regime",   name: { en: "Energy Regime Tracker",      zh: "能源体制追踪" },   body: { en: "Joules-per-capita, EROI, primary mix, infrastructure half-life.",                                zh: "人均焦耳、能源回报率（EROI）、一次能源构成、基础设施半衰期。" } },
      { id: "supply-chain",    name: { en: "Supply Chain Graph",         zh: "供应链图" },      body: { en: "Cross-border material flows, choke points, substitution paths.",                                  zh: "跨境物资流、咽喉节点、替代路径。" } },
      { id: "industrial-evo",  name: { en: "Industrial Evolution",       zh: "工业演化" },      body: { en: "Eras: artisan → manufactory → factory → automation → biofab.",                                    zh: "时代序列：手工 → 工场 → 工厂 → 自动化 → 生物制造。" } },
      { id: "semiconductor",   name: { en: "Semiconductor Civilization", zh: "半导体文明" },     body: { en: "Wafer → fab → node → architecture → planetary compute layer.",                                   zh: "晶圆 → 晶圆厂 → 制程 → 架构 → 星球级算力层。" } },
    ],
    dataModel: {
      name: { en: "Material", zh: "Material（材料）" },
      fields: [
        { key: "id",            type: "uuid",                  note: { en: "Material id",                       zh: "材料 id" } },
        { key: "first_used",    type: "year",                  note: { en: "Year of first significant use",     zh: "首次显著使用年份" } },
        { key: "prerequisites", type: "uuid[]",                note: { en: "Materials/processes required",      zh: "所需的前置材料/工艺" } },
        { key: "energy_cost",   type: "MJ/kg",                 note: { en: "Approximate energy to produce",     zh: "生产所需的近似能量" } },
        { key: "civ_unlock",    type: "string[]",              note: { en: "Capabilities unlocked downstream",  zh: "下游解锁的能力" } },
      ],
    },
    apis: [
      { to: "civilization-os", contract: { en: "Publish current energy budget and material constraints.",  zh: "发布当前能源预算与材料约束。" }, signature: "POST /civ/{id}/energy-budget" },
      { to: "decision-os",     contract: { en: "Constrain economic decision space by material realities.", zh: "以物质现实约束经济决策空间。" }, signature: "GET /constraints/material" },
      { to: "reality-kernel",  contract: { en: "Resolve thermodynamic feasibility of proposed processes.", zh: "解算所提工艺的热力学可行性。" }, signature: "POST /thermo/feasibility" },
      { to: "cycle-engine",    contract: { en: "Report material-regime transitions as phase markers.",     zh: "把材料体制跃迁作为相位标记上报。" }, signature: "POST /cycles/marker" },
    ],
    equations: [
      { expr: "Civ_capability ∝ ∫ Energy_per_capita · Material_hardness dt",                              caption: { en: "Total capability scales with cumulative energy × hardest material accessible.",         zh: "总体能力随累积『人均能量 × 可达最硬材料』缩放。" } },
      { expr: "EROI = Energy_returned / Energy_invested",                                                  caption: { en: "If EROI < ~5, society can't fund non-survival activities.",                              zh: "若 EROI < 约 5，社会无法供养非生存性活动。" } },
      { expr: "Moore: nodes(t) ∝ 2^(t/2y)",                                                                caption: { en: "Semiconductor doubling — empirical, not physical law.",                                  zh: "半导体翻倍——经验规律，非物理定律。" } },
    ],
    uiScreens: [
      { en: "Material tree visual (tech-tree style)",     zh: "材料树（科技树式）" },
      { en: "Energy regime stacked-area chart",            zh: "能源体制堆叠面积图" },
      { en: "Supply chain choke-point map",                zh: "供应链咽喉节点地图" },
      { en: "Semiconductor node race",                     zh: "半导体节点竞速" },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    id: "psy-protocol-spec",
    slug: "psy-protocol-spec",
    agent: { en: "Agent 4 — Protocol Systems Engineer", zh: "Agent 4 — 协议系统工程师" },
    name: { en: "Psy Protocol Spec", zh: "Psy 协议规范" },
    glyph: "Ⅳ",
    hue: "#3a6e62",
    oneLine: {
      en: "The distributed coordination layer beneath the ecosystem — realms, coordinators, state, attestations.",
      zh: "本生态系底下的分布式协同层——realm、coordinator、state、attestation。",
    },
    body: {
      en: "The Psy Protocol Spec defines how all the other systems in the ecosystem actually talk to each other. It is the wire format. Each system runs as one or more 'realms' (state-machine partitions); each realm has a coordinator (sequencer + state-root publisher); state transitions are attested by zero-knowledge proofs (Plonky2/Goldilocks/Poseidon — same family as the production Psy Protocol). Cross-system reads are mediated by realm-to-realm proof verification. This is the only layer of the ecosystem with a real implementation reference (the production Psy Protocol); everything above is research.",
      zh: "Psy Protocol Spec 定义了生态系中其他所有系统在线缆上如何彼此交谈。它是 wire format。每个系统作为一个或多个 realm（状态机分区）运行；每个 realm 有一个 coordinator（排序器 + 状态根发布器）；状态转移由零知识证明（Plonky2/Goldilocks/Poseidon——与生产环境的 Psy Protocol 同族）所证。跨系统读取，通过 realm 与 realm 之间的证明验证而中介。这是本生态系唯一具有现实参考实现的层（生产环境的 Psy Protocol）；其上的诸层皆为研究。",
    },
    modules: [
      { id: "realm",         name: { en: "Realm",                  zh: "Realm（领域）" },     body: { en: "State machine partition; one civilization sub-system per realm in the canonical mapping.",         zh: "状态机分区；规范映射中每个文明子系统对应一个 realm。" } },
      { id: "coordinator",   name: { en: "Coordinator",            zh: "Coordinator（协调器）" }, body: { en: "Sequencer + state-root publisher per realm; submits attestations to the consensus layer.",       zh: "每 realm 的排序器与状态根发布者；向共识层提交证明。" } },
      { id: "state-root",    name: { en: "State Root",             zh: "State Root（状态根）" },  body: { en: "Merkle commitment to current state; cross-realm reads verify against it.",                          zh: "对当前状态的 Merkle 承诺；跨 realm 读取据此验证。" } },
      { id: "proofs",        name: { en: "Proofs (Plonky2)",       zh: "证明（Plonky2）" },     body: { en: "Recursive STARK-friendly proofs over Goldilocks field; Poseidon hashing.",                            zh: "Goldilocks 域上的递归 STARK 友好证明；Poseidon 哈希。" } },
      { id: "bridge",        name: { en: "Cross-Realm Bridge",     zh: "跨 realm 桥" },         body: { en: "Light-client proof verification that lets realm A read realm B without trusting an oracle.",            zh: "轻客户端证明验证——使 realm A 能读 realm B 而无须信任 oracle。" } },
    ],
    dataModel: {
      name: { en: "Realm", zh: "Realm" },
      fields: [
        { key: "id",          type: "u32",          note: { en: "Realm identifier (matches civilization sub-system id)", zh: "realm 标识（与文明子系统 id 对应）" } },
        { key: "state_root",  type: "bytes32",      note: { en: "Latest committed state root",                          zh: "最新提交的状态根" } },
        { key: "coordinator", type: "address",      note: { en: "Coordinator's signing key",                            zh: "协调器签名密钥" } },
        { key: "epoch",       type: "u64",          note: { en: "Monotonic epoch counter",                              zh: "单调递增的 epoch 计数器" } },
        { key: "proof_kind",  type: "enum",         note: { en: "{ Groth16, Plonky2, Stark }",                          zh: "{ Groth16, Plonky2, Stark }" } },
      ],
    },
    apis: [
      { to: "civilization-os", contract: { en: "Publish state-root commitments to civ-level ledger.",  zh: "向文明级账簿发布状态根承诺。" },             signature: "POST /commit" },
      { to: "decision-os",     contract: { en: "Verify a remote decision proof.",                      zh: "验证一份远端决策证明。" },                  signature: "POST /verify" },
      { to: "life-os",         contract: { en: "Attest population transition without revealing identities.", zh: "对人口转变作出证明——而不暴露身份。" },     signature: "POST /attest/private" },
      { to: "*",               contract: { en: "Universal cross-realm read by light-client proof.",   zh: "通过轻客户端证明的通用跨 realm 读取。" },     signature: "GET /read?realm=…&path=…&proof=…" },
    ],
    equations: [
      { expr: "verify(π, x, vk) ∈ {0, 1}",                                                         caption: { en: "Soundness: verifier accepts only valid proofs.",                                       zh: "可靠性：验证者仅接受有效证明。" } },
      { expr: "|π| = O(log n) — succinct",                                                          caption: { en: "Proof size is logarithmic in computation; succinctness is what makes the bridge viable.", zh: "证明大小对计算量取对数；简洁性正是使桥成为可能的原因。" } },
      { expr: "state_root_{t+1} = H(state_t, txs_t, attestations_t)",                              caption: { en: "Each epoch's root commits to all events in that epoch.",                              zh: "每个 epoch 的根承诺该 epoch 内所有事件。" } },
    ],
    uiScreens: [
      { en: "Realm topology map",                          zh: "Realm 拓扑图" },
      { en: "Live coordinator status grid",                zh: "协调器状态实时网格" },
      { en: "Proof verification ledger",                   zh: "证明验证账簿" },
      { en: "Cross-realm message inspector",               zh: "跨 realm 消息检视器" },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    id: "clan-civilization",
    slug: "clan-civilization",
    agent: { en: "Agent (composite) — Kinship & Trust Networks", zh: "Agent（合成）— 亲族与信任网络" },
    name: { en: "Clan Civilization", zh: "宗族文明" },
    glyph: "Ⅴ",
    hue: "#7d6c8a",
    oneLine: {
      en: "Trust networks at the kinship and lineage scale — the substrate institutions are built on top of.",
      zh: "亲族与世系尺度的信任网络——制度搭建于其上的基底。",
    },
    body: {
      en: "Clan Civilization models the substrate of trust that all formal institutions presuppose. Where Decision OS reasons about laws and contracts, Clan Civilization reasons about who is willing to honor them at all. The unit is the lineage (zupu, family tree, tribe, hometown association); the operations are credit, marriage, mutual aid, dispute resolution, and emigration. Some societies build modern institutions on top of strong clan substrates (Confucian East Asia, Ashkenazi communities, overseas Chinese networks); some attempt to dissolve clans into pure individual citizenship (modern French republicanism). Both can work; both have failure modes.",
      zh: "Clan Civilization 模型化所有正式制度都预设的『信任基底』。Decision OS 推理法律与契约——Clan Civilization 推理的是『有谁愿意去遵守它们』。单位是世系（族谱、家谱、部落、同乡会）；操作包括信贷、婚姻、互助、争端裁断与迁徙。一些社会在强宗族基底之上建起现代制度（儒家东亚、阿什肯纳兹社群、海外华人网络）；一些社会则试图把宗族溶解为纯粹的个体公民身份（现代法兰西共和主义）。两者皆能成立，亦皆有其失效模式。",
    },
    modules: [
      { id: "lineage-graph", name: { en: "Lineage Graph",            zh: "世系图谱" },        body: { en: "Directed acyclic graph of descent; supports zupu / pedigree imports.",                                  zh: "传承的有向无环图；支持族谱/家谱导入。" } },
      { id: "trust-credit",  name: { en: "Trust-Credit Model",       zh: "信任—信用模型" },    body: { en: "Reputational credit within kin networks; default has collective consequences.",                          zh: "亲族网络内的声誉信用——违约伴随集体后果。" } },
      { id: "marriage-net",  name: { en: "Marriage Network",         zh: "婚姻网络" },        body: { en: "Affinal alliances form bridges between lineage clusters.",                                              zh: "姻亲联盟在世系簇之间架桥。" } },
      { id: "diaspora-link", name: { en: "Diaspora Linkage",         zh: "侨乡连结" },        body: { en: "Hometown associations + remittance routes (qiaopi-style); bridges ancestor village → host city.",          zh: "同乡会 + 侨批式汇款路径；连接祖籍村与寄居城。" } },
      { id: "dissolution",   name: { en: "Dissolution Tracker",      zh: "瓦解追踪" },         body: { en: "Measures clan-tie attenuation under modernization, urbanization, migration.",                              zh: "测量宗族纽带在现代化、城市化、迁徙下的衰减。" } },
    ],
    dataModel: {
      name: { en: "Lineage", zh: "Lineage（世系）" },
      fields: [
        { key: "id",           type: "uuid",        note: { en: "Lineage id",                                zh: "世系 id" } },
        { key: "founder",      type: "Person",      note: { en: "Apical ancestor (may be legendary)",        zh: "始祖（可为传说人物）" } },
        { key: "members",      type: "Person[]",    note: { en: "Living + recorded ancestors",               zh: "在世与有记录的祖先" } },
        { key: "trust_density",type: "float",       note: { en: "Internal trust score 0..1",                 zh: "内部信任度 0..1" } },
        { key: "diaspora_ties",type: "edge[]",      note: { en: "External hometown associations",            zh: "外部同乡纽带" } },
      ],
    },
    apis: [
      { to: "decision-os",     contract: { en: "Provide trust priors for contract enforceability.",  zh: "为契约可执行性提供信任先验。" },             signature: "GET /trust?between=A,B" },
      { to: "civilization-os", contract: { en: "Report aggregate clan-strength index for the civ.",  zh: "上报该文明的整体宗族强度指数。" },           signature: "POST /civ/{id}/clan-index" },
      { to: "life-os",         contract: { en: "Read birth/death/marriage events affecting lineages.",zh: "读取影响世系的生/卒/婚事件。" },           signature: "WS /life/events" },
      { to: "memory-os",       contract: { en: "Persist genealogical records as long-term memory.",  zh: "把族谱记录作为长期记忆持久化。" },             signature: "POST /memory/genealogy" },
    ],
    equations: [
      { expr: "TrustDensity = Σ_edges(strength) / N(N−1)/2",                                            caption: { en: "Average pairwise trust within a lineage of N members.",                                  zh: "N 成员世系内成对信任的平均值。" } },
      { expr: "DiasporaResilience = Trust × Mobility × Memory",                                          caption: { en: "Diaspora networks survive when all three remain non-zero.",                              zh: "三者皆非零时，离散网络方能存活。" } },
    ],
    uiScreens: [
      { en: "Lineage tree explorer",                       zh: "世系树浏览器" },
      { en: "Trust-density heatmap",                       zh: "信任密度热图" },
      { en: "Diaspora flow map (origin → host city)",      zh: "离散流图（祖籍 → 寄居城）" },
      { en: "Clan-dissolution dashboard",                  zh: "宗族瓦解仪表盘" },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    id: "sensory-os",
    slug: "sensory-os",
    agent: { en: "Agent 6 — Perception & Consciousness Researcher", zh: "Agent 6 — 感知与意识研究者" },
    name: { en: "Sensory OS", zh: "感知操作系统" },
    glyph: "Ⅵ",
    hue: "#5a8c4a",
    oneLine: {
      en: "Perception as construction. The brain doesn't see; it predicts.",
      zh: "感知即构造。大脑不是『看』，而是『预测』。",
    },
    body: {
      en: "Sensory OS models perception as predictive inference rather than passive reception. The retina sends fewer bits than the optic nerve carries; the rest is generated by the brain's prior model of the world (predictive coding, free-energy principle). What we 'see' is the brain's best running hypothesis about what would explain the sensory signal. The same architecture seems to scale to AI: large multimodal models build internal world-models from compressed signal. Sensory OS treats biological and artificial perception as instances of a single design pattern — minimum-description-length world models updated by prediction error.",
      zh: "Sensory OS 把感知建模为预测性推断——而非被动接收。视网膜送出的比特数少于视神经所承载——其余由大脑对世界的先验模型生成（预测编码、自由能原理）。我们所『看见』的，是大脑对『什么能解释这个感觉信号』的当前最佳假设。同一架构似乎可缩放到 AI：大型多模态模型从压缩信号中构建内部世界模型。Sensory OS 把生物感知与人工感知视作同一设计模式的实例——以预测误差为驱动的最小描述长度世界模型。",
    },
    modules: [
      { id: "predictive-coder", name: { en: "Predictive Coder",            zh: "预测编码器" },    body: { en: "Hierarchical generative model; top-down predictions, bottom-up prediction errors.",            zh: "分层生成模型——自上而下的预测、自下而上的预测误差。" } },
      { id: "attention",        name: { en: "Attention Allocator",         zh: "注意力分配器" },    body: { en: "Selects where to spend high-precision sampling; gates sensory bandwidth.",                     zh: "选择把高精度采样投到何处——为感觉带宽设门。" } },
      { id: "perceptual-set",   name: { en: "Perceptual Set",              zh: "知觉定势" },        body: { en: "Cultural and personal priors that bias what we are likely to perceive.",                       zh: "影响我们『更容易感知到什么』的文化与个人先验。" } },
      { id: "bridge-ai",        name: { en: "Biology↔AI Bridge",            zh: "生物↔AI 桥" },     body: { en: "Maps biological perceptual constructs onto artificial-system equivalents.",                    zh: "把生物的感知构件映射到人工系统的对应物。" } },
      { id: "illusion-bench",   name: { en: "Illusion Bench",              zh: "错觉测试台" },     body: { en: "Standard set of optical/auditory illusions used to probe predictive coding behavior.",          zh: "用于探测预测编码行为的标准光/听错觉集合。" } },
    ],
    dataModel: {
      name: { en: "Percept", zh: "Percept（知觉）" },
      fields: [
        { key: "id",         type: "uuid",          note: { en: "Percept id",                            zh: "知觉 id" } },
        { key: "modality",   type: "enum",          note: { en: "{visual, auditory, somatic, ...}",       zh: "{视觉、听觉、本体感觉、…}" } },
        { key: "prediction", type: "tensor",        note: { en: "Top-down prediction at this layer",      zh: "本层自上而下的预测" } },
        { key: "error",      type: "tensor",        note: { en: "Residual prediction error",              zh: "残余预测误差" } },
        { key: "precision",  type: "float",         note: { en: "Inverse variance — attention proxy",     zh: "方差倒数——注意力代理量" } },
      ],
    },
    apis: [
      { to: "decision-os",      contract: { en: "Supply perceptual posterior to decision module.",        zh: "向决策模块供应感知后验。" },                  signature: "GET /percept/posterior" },
      { to: "idea-evolution",   contract: { en: "Receive narrative priors that bias perception.",         zh: "接收影响感知的叙事先验。" },                   signature: "POST /priors/narrative" },
      { to: "life-os",          contract: { en: "Read neural substrate parameters per individual.",       zh: "按个体读取神经基底参数。" },                   signature: "GET /life/{id}/neural" },
      { to: "civilization-os",  contract: { en: "Aggregate population-level perceptual drift.",           zh: "汇总人群层面的感知漂移。" },                   signature: "POST /civ/{id}/perceptual-drift" },
    ],
    equations: [
      { expr: "F = D_KL(q(z|x) ∥ p(z)) − E_q[log p(x|z)]",                                            caption: { en: "Variational free energy — prediction error + complexity. Brains minimize this.",        zh: "变分自由能 = 预测误差 + 复杂度。脑在最小化它。" } },
      { expr: "Percept = argmax_z p(z|x) ≈ posterior over hidden causes given sensation",            caption: { en: "What we perceive is the most likely hidden cause given the signal.",                    zh: "我们所感知的，是给定信号下最可能的潜在因。" } },
      { expr: "Attention ∝ precision = 1 / σ²",                                                       caption: { en: "Attention is increasing the inverse variance assigned to a channel.",                   zh: "注意力 = 增加分配给某通道的方差倒数。" } },
    ],
    uiScreens: [
      { en: "Live retina-vs-perception bandwidth diff",         zh: "视网膜 vs 知觉带宽实时差" },
      { en: "Predictive-coding hierarchy explorer",              zh: "预测编码层级浏览器" },
      { en: "Illusion bench (interactive)",                      zh: "错觉测试台（可交互）" },
      { en: "Biology↔AI percept correspondence map",             zh: "生物↔AI 知觉对应映射" },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    id: "reality-kernel",
    slug: "reality-kernel",
    agent: { en: "Agent 7 — Physics & Reality Modeler", zh: "Agent 7 — 物理与现实建模师" },
    name: { en: "Reality Kernel", zh: "现实内核" },
    glyph: "Ⅶ",
    hue: "#5d7494",
    oneLine: {
      en: "The physics layer beneath everything. Energy, information, computation as universal substrate.",
      zh: "万物之下的物理层。能量、信息、计算——作为通用基底。",
    },
    body: {
      en: "Reality Kernel is the substrate. It models the universe as an information-processing system: energy and matter are bookkeeping over a vast computation; physical law is the kernel scheduler. Three layers: the field layer (quantum fields, gauge symmetries), the thermodynamic layer (entropy gradients, dissipative structures, life as a far-from-equilibrium computation), and the computational layer (Bekenstein bound, holographic principle, the universe as a finite-state machine bounded by area not volume). Higher systems in this ecosystem inherit constraints from this kernel — Material Civilization cannot violate thermodynamics; Decision OS cannot exceed Landauer's bound; Life OS cannot escape the second law.",
      zh: "Reality Kernel 是基底。它把宇宙建模为一个信息处理系统：能量与物质是某个巨型计算之上的记账；物理定律是内核的调度器。三层：场层（量子场、规范对称）、热力学层（熵梯度、耗散结构、生命作为一种远离平衡的计算）、计算层（Bekenstein 界、全息原理——宇宙作为一台以面积而非体积为界的有限状态机）。本生态系中更高的系统从此内核继承约束——Material Civilization 不能违反热力学；Decision OS 不能超过 Landauer 界；Life OS 不能逃出第二定律。",
    },
    modules: [
      { id: "field-layer",      name: { en: "Field Layer",              zh: "场层" },         body: { en: "Standard model fields, gauge groups, lagrangians; conservation laws as derived constraints.",   zh: "标准模型场、规范群、拉格朗日量；守恒律作为派生约束。" } },
      { id: "thermo-layer",     name: { en: "Thermodynamic Layer",      zh: "热力学层" },       body: { en: "Entropy budget, dissipative structures, free-energy currents, life as computation.",            zh: "熵预算、耗散结构、自由能流——生命作为一种计算。" } },
      { id: "compute-layer",    name: { en: "Computational Layer",      zh: "计算层" },        body: { en: "Bekenstein bound, holographic principle, Landauer limit; the universe as bounded computation.",  zh: "Bekenstein 界、全息原理、Landauer 极限——宇宙作为受限计算。" } },
      { id: "law-abstraction",  name: { en: "Law Abstraction Engine",   zh: "定律抽象引擎" },   body: { en: "Lifts physical laws into the ontology that other systems can query.",                        zh: "把物理定律提升到其他系统可查询的本体之中。" } },
      { id: "feasibility",      name: { en: "Feasibility Resolver",     zh: "可行性解算器" },    body: { en: "Answers 'is this physically possible?' for proposals from Material/Life/Decision OS.",          zh: "对 Material/Life/Decision OS 的提案回答『物理上可行吗？』" } },
    ],
    dataModel: {
      name: { en: "PhysicalLaw", zh: "PhysicalLaw（物理定律）" },
      fields: [
        { key: "id",          type: "uuid",       note: { en: "Law id",                                  zh: "定律 id" } },
        { key: "domain",      type: "enum",       note: { en: "{quantum, classical, statistical, info}", zh: "{量子、经典、统计、信息}" } },
        { key: "form",        type: "string",     note: { en: "Symbolic form",                            zh: "符号形式" } },
        { key: "regime",      type: "string",     note: { en: "Conditions under which it holds",          zh: "成立条件" } },
        { key: "implications",type: "uuid[]",     note: { en: "Higher-system constraints derived from it",zh: "由其推导出的高层系统约束" } },
      ],
    },
    apis: [
      { to: "material-civilization", contract: { en: "Resolve thermodynamic feasibility of a proposed process.", zh: "解算所提工艺的热力学可行性。" }, signature: "POST /thermo/feasibility" },
      { to: "decision-os",           contract: { en: "Constrain decision space by Landauer cost.",                zh: "以 Landauer 成本约束决策空间。" },     signature: "GET /constraints/landauer" },
      { to: "life-os",               contract: { en: "Resolve metabolic-energetics feasibility.",                  zh: "解算代谢能学可行性。" },              signature: "POST /metabo/feasibility" },
      { to: "civilization-os",       contract: { en: "Publish hard ceilings (energy, info) on civ trajectories.", zh: "发布对文明轨迹的硬性上限（能量、信息）。" }, signature: "GET /ceilings/{civ_id}" },
    ],
    equations: [
      { expr: "ΔS_universe ≥ 0",                                                                       caption: { en: "Second law — the irreversible direction of all higher-system processes.",            zh: "第二定律——一切高层过程不可逆的方向。" } },
      { expr: "E_min(bit_erasure) = k_B T ln 2",                                                        caption: { en: "Landauer bound — minimum energy to erase one bit.",                                  zh: "Landauer 界——擦除一比特所需的最小能量。" } },
      { expr: "I_max(region) = A / (4 ℓ_P²)",                                                            caption: { en: "Bekenstein-Hawking bound — information bounded by area, not volume.",                zh: "Bekenstein-Hawking 界——信息以面积、而非体积为界。" } },
      { expr: "F = U − TS — minimize for spontaneous process",                                           caption: { en: "Free-energy minimization — engine of all life and most coordination.",                zh: "自由能最小化——一切生命与多数协同的引擎。" } },
    ],
    uiScreens: [
      { en: "Energy ↔ information dashboard",                  zh: "能量 ↔ 信息仪表盘" },
      { en: "Feasibility query console",                       zh: "可行性查询控制台" },
      { en: "Law dependency graph",                            zh: "定律依赖图" },
      { en: "Universe-as-computer visual",                     zh: "『宇宙即计算机』视觉化" },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    id: "decision-os",
    slug: "decision-os",
    agent: { en: "Agent 8 — Decision & Behavior Systems Analyst", zh: "Agent 8 — 决策与行为系统分析师" },
    name: { en: "Decision OS", zh: "决策操作系统" },
    glyph: "Ⅷ",
    hue: "#c89a3a",
    oneLine: {
      en: "Game theory + AI + economics fused into a unified agent-decision substrate.",
      zh: "博弈论 + AI + 经济学熔为一统的『代理决策基底』。",
    },
    body: {
      en: "Decision OS models how agents — humans, organizations, AI systems — actually choose. It blends classical decision theory (utility, expected value), game theory (best-response, equilibrium), bounded-rationality models (heuristics, prospect theory), and modern reinforcement-learning agents. The system represents decisions as a graph: nodes are choice points, edges are conditional probabilities and payoffs, agents are policies operating over the graph. The honest position: optimal play in any non-trivial environment is intractable; the interesting question is which approximations actually survive long-run iteration.",
      zh: "Decision OS 模型化代理（人、组织、AI 系统）实际如何选择。它融合经典决策论（效用、期望值）、博弈论（最佳回应、均衡）、有限理性模型（启发式、前景理论）与现代强化学习代理。系统把决策表示为图：节点是抉择点，边是条件概率与收益，代理是在图上运行的策略。诚实地讲：任何非平凡环境中的最优博弈是不可解的——有意义的问题是『哪些近似法在长期迭代中真的能存活下来』。",
    },
    modules: [
      { id: "graph-runtime", name: { en: "Decision Graph Runtime",   zh: "决策图运行时" },     body: { en: "Executes choice graphs with stochastic outcomes; logs trajectories.",                              zh: "执行带随机结果的抉择图——记录轨迹。" } },
      { id: "policy-zoo",    name: { en: "Policy Zoo",                zh: "策略动物园" },      body: { en: "Library of agent policies: utility-max, satisficer, RL-trained, best-response, heuristic.",        zh: "代理策略库：效用最大化、满足化、RL 训练、最佳回应、启发式。" } },
      { id: "game-board",    name: { en: "Game Board",                zh: "博弈盘" },         body: { en: "n-player environments with shared state; standard catalog of games (PD, stag, public goods).",      zh: "n 人共享状态的环境——博弈标准库（囚徒困境、猎鹿、公共品）。" } },
      { id: "institutions",  name: { en: "Institution Layer",         zh: "制度层" },         body: { en: "Norms, contracts, courts, money — alters the payoff structure exogenously.",                       zh: "规范、契约、法庭、货币——外生地改变收益结构。" } },
      { id: "ai-economy",    name: { en: "AI Economy Sim",            zh: "AI 经济模拟" },     body: { en: "Multi-agent simulation including LLM-style agents acting under shared institutions.",              zh: "多代理模拟——包括 LLM 风格代理在共同制度下的行为。" } },
    ],
    dataModel: {
      name: { en: "Decision", zh: "Decision（决策）" },
      fields: [
        { key: "id",          type: "uuid",          note: { en: "Decision id",                          zh: "决策 id" } },
        { key: "agent_id",    type: "uuid",          note: { en: "Acting agent",                          zh: "行动代理" } },
        { key: "choice_set",  type: "Option[]",      note: { en: "Available actions at this node",        zh: "本节点可用动作" } },
        { key: "policy",      type: "PolicyId",      note: { en: "Which policy generated the action",     zh: "由哪种策略生成本动作" } },
        { key: "outcome",     type: "Payoff",        note: { en: "Realized outcome after stochastic resolution", zh: "随机化后落实的结果" } },
      ],
    },
    apis: [
      { to: "civilization-os",     contract: { en: "Submit decision outcomes to civ ledger.",            zh: "向文明账簿提交决策结果。" },                     signature: "POST /civ/{id}/decisions" },
      { to: "sensory-os",          contract: { en: "Pull perceptual posterior for the deciding agent.",  zh: "拉取决策代理的感知后验。" },                     signature: "GET /percept/posterior" },
      { to: "idea-evolution",      contract: { en: "Pull narrative priors influencing payoff perception.",zh: "拉取影响收益感知的叙事先验。" },                  signature: "GET /priors/narrative" },
      { to: "clan-civilization",   contract: { en: "Pull trust priors between agents.",                  zh: "拉取代理之间的信任先验。" },                     signature: "GET /trust" },
      { to: "reality-kernel",      contract: { en: "Check Landauer/thermo cost of executing a policy.",  zh: "检查执行某策略的 Landauer/热力学代价。" },         signature: "POST /thermo/cost" },
    ],
    equations: [
      { expr: "EU(a) = Σ_s p(s|a)·U(s)",                                                              caption: { en: "Expected utility — classical decision theory baseline.",                              zh: "期望效用——经典决策论基线。" } },
      { expr: "BR_i(a_{−i}) = argmax_{a_i} u_i(a_i, a_{−i})",                                          caption: { en: "Best-response operator; Nash equilibria are fixed points of the joint BR map.",        zh: "最佳回应算子；纳什均衡是联合 BR 映射的不动点。" } },
      { expr: "Q(s,a) ← Q(s,a) + α[r + γ·max_{a'} Q(s',a') − Q(s,a)]",                               caption: { en: "Bellman update — basis of modern reinforcement learning agents.",                     zh: "Bellman 更新——现代强化学习代理的基底。" } },
      { expr: "v(x) = (1−w)·U_obj(x) + w·U_narr(x)",                                                  caption: { en: "Empirical: humans weight narrative-coloured utility against objective utility.",       zh: "经验观察：人类把『被叙事染色的效用』与客观效用按比例加权。" } },
    ],
    uiScreens: [
      { en: "Decision graph editor",                            zh: "决策图编辑器" },
      { en: "Policy comparison arena",                          zh: "策略对决竞技场" },
      { en: "Game-board sandbox",                               zh: "博弈盘沙盒" },
      { en: "AI-economy multi-agent run",                       zh: "AI 经济多代理回放" },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    id: "cycle-engine",
    slug: "cycle-engine",
    agent: { en: "Agent 9 — Temporal Systems Engineer", zh: "Agent 9 — 时序系统工程师" },
    name: { en: "Cycle Engine", zh: "周期引擎" },
    glyph: "Ⅸ",
    hue: "#bd3a2c",
    oneLine: {
      en: "Civilizations and systems pass through phases. Cycle Engine identifies the phase you're in.",
      zh: "文明与系统皆走过相位。Cycle Engine 识别你正处于哪一相位。",
    },
    body: {
      en: "Cycle Engine catalogs the recurrent patterns by which civilizations and other complex systems rise, mature, decay, and renew. It draws on Khaldun's asabiyyah cycle, Strauss-Howe generational theory, Turchin's cliodynamics, Kondratiev waves, Polanyi's double movement, and the dynastic cycle of Chinese historiography. The output is not prophecy but diagnosis: given current state, which phase signature most closely matches, and what historically tends to follow. The system does not 'predict' so much as it locates the present in a manifold of historically attested trajectories.",
      zh: "Cycle Engine 收录复杂系统反复经历的兴—盛—衰—复模式。它取材于伊本·赫勒敦的 asabiyyah 周期、Strauss-Howe 代际理论、Turchin 的历史动力学、Kondratiev 长波、Polanyi 的双向运动，以及中国史学的王朝循环。输出不是预言——是诊断：给定当下状态，哪一相位特征与之最匹配——以及历史上之后通常发生什么。系统不做『预测』，而是把当下定位在『历史上已得证实的轨迹』所张成的流形之上。",
    },
    modules: [
      { id: "phase-classifier", name: { en: "Phase Classifier",       zh: "相位分类器" },     body: { en: "Maps state vectors to one of N canonical phase archetypes (rise / peak / strain / collapse / renewal).",  zh: "把状态向量映射到 N 个经典相位原型之一（兴/盛/衰张/崩/复）。" } },
      { id: "wave-library",     name: { en: "Wave Library",           zh: "波形库" },         body: { en: "Catalog of cycle theories with operationalized state-transition rules.",                                       zh: "周期理论目录——附可操作的状态转移规则。" } },
      { id: "trajectory-bank",  name: { en: "Trajectory Bank",        zh: "轨迹库" },         body: { en: "Historically attested phase sequences across civilizations as templates.",                                     zh: "历史上有据可查的、跨文明的相位序列——作为模板。" } },
      { id: "leading-signals",  name: { en: "Leading Signals",        zh: "先行信号" },        body: { en: "Indicators that historically precede phase transitions (elite overproduction, debt overhang, demographic shift).", zh: "历史上先于相位转换出现的指示器（精英过剩、债务积压、人口结构变化）。" } },
      { id: "scenario-tree",    name: { en: "Scenario Tree",          zh: "情景树" },         body: { en: "Branching projections from current phase given different shock paths.",                                        zh: "从当前相位出发——在不同冲击路径下的分支推演。" } },
    ],
    dataModel: {
      name: { en: "Phase", zh: "Phase（相位）" },
      fields: [
        { key: "id",         type: "uuid",         note: { en: "Phase instance id",                       zh: "相位实例 id" } },
        { key: "civ_id",     type: "uuid",         note: { en: "Civilization to which it belongs",        zh: "所属文明" } },
        { key: "archetype",  type: "enum",         note: { en: "{rise, peak, strain, collapse, renewal}", zh: "{兴、盛、衰张、崩、复}" } },
        { key: "started",    type: "year",         note: { en: "Empirical start date",                    zh: "经验起始日期" } },
        { key: "drivers",    type: "string[]",     note: { en: "Causal drivers ascribed in retrospect",   zh: "事后归因的驱动因素" } },
      ],
    },
    apis: [
      { to: "civilization-os", contract: { en: "Push phase-transition events to the civ ledger.",  zh: "把相位转换事件推送至文明账簿。" },              signature: "POST /civ/{id}/phase" },
      { to: "decision-os",     contract: { en: "Provide phase priors that bias optimal policy.",  zh: "提供影响最优策略的相位先验。" },               signature: "GET /priors/phase" },
      { to: "memory-os",       contract: { en: "Read historical trajectories as training data.",  zh: "读取历史轨迹作为训练数据。" },                  signature: "GET /memory/trajectories" },
      { to: "idea-evolution",  contract: { en: "Phase-bias on meme fitness (e.g., crisis memes).",zh: "对模因适应度的相位偏置（如危机期模因）。" },     signature: "POST /bias/meme-fitness" },
    ],
    equations: [
      { expr: "P(phase_{t+1} | phase_t, signals_t) — Markov-on-signals",                                caption: { en: "Phase transitions conditional on observable leading signals.",                          zh: "相位转换以可观测的先行信号为条件。" } },
      { expr: "Asabiyyah(t) ≈ exp(−t/τ) — Khaldunian decay",                                            caption: { en: "Group cohesion decays exponentially without periodic renewal.",                         zh: "群体凝聚力按指数衰减——除非周期性更新。" } },
      { expr: "Stress = (elite_count·aspirations) / available_slots",                                    caption: { en: "Cliodynamic 'elite overproduction' index — leading signal of strain phase.",            zh: "历史动力学的『精英过剩』指数——衰张期的先行信号。" } },
    ],
    uiScreens: [
      { en: "Phase clock — locate the present civ in the cycle",        zh: "相位时钟——把当下文明定位在周期中" },
      { en: "Wave library catalog",                                      zh: "波形库目录" },
      { en: "Leading-signals dashboard",                                 zh: "先行信号仪表盘" },
      { en: "Scenario tree explorer",                                    zh: "情景树浏览器" },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    id: "life-os",
    slug: "life-os",
    agent: { en: "Agent 5 — Biological Intelligence Scientist", zh: "Agent 5 — 生物智能科学家" },
    name: { en: "Life OS", zh: "生命操作系统" },
    glyph: "Ⅹ",
    hue: "#5fa379",
    oneLine: {
      en: "Biological computation as a stack: cells → tissues → brains → bodies → populations.",
      zh: "把生物计算视作一个栈：细胞 → 组织 → 大脑 → 身体 → 种群。",
    },
    body: {
      en: "Life OS treats living systems as a multi-scale computation. Each cell is a chemical state machine; tissue is the aggregate; the nervous system is the long-distance signaling layer; the brain is a predictive model of the world; the population is a search algorithm running on the genome over evolutionary time. Life OS connects these scales into one model and exposes them to the rest of the ecosystem. Civilization OS pulls demographic projections; Decision OS pulls neural priors; Sensory OS pulls the perceptual substrate; Reality Kernel imposes thermodynamic ceilings. The honest position: most of biology is still folk physics dressed up as molecular detail; the interesting frontier is where information theory and chemistry meet.",
      zh: "Life OS 把生命视作一个多尺度的计算：每个细胞是一个化学状态机；组织是其聚合；神经系统是远距信号层；大脑是世界的预测模型；种群是基因组在演化时间尺度上运行的一个搜索算法。Life OS 把这些尺度连成一个模型——并对生态系其他部分暴露接口。Civilization OS 拉取人口学预测；Decision OS 拉取神经先验；Sensory OS 拉取知觉基底；Reality Kernel 施加热力学上限。诚实地讲：今天大多数生物学仍是『包装成分子细节的民间物理』；有意思的前沿，是信息论与化学相遇之处。",
    },
    modules: [
      { id: "cell-machine",   name: { en: "Cell State Machine",       zh: "细胞状态机" },     body: { en: "Gene-regulation network + metabolism + signaling as a discrete-event system.",                          zh: "基因调控网络 + 代谢 + 信号——作为离散事件系统。" } },
      { id: "neural-stack",   name: { en: "Neural Stack",             zh: "神经栈" },         body: { en: "Spiking → cortical column → area → network — predictive coding hierarchy.",                            zh: "脉冲 → 皮层柱 → 脑区 → 网络——预测编码层级。" } },
      { id: "evo-search",     name: { en: "Evolutionary Search",      zh: "演化搜索" },        body: { en: "Population-genetic dynamics; selection, drift, recombination, novelty.",                                zh: "种群遗传动力学——选择、漂变、重组、新颖性。" } },
      { id: "demography",     name: { en: "Demography",               zh: "人口学" },         body: { en: "Birth, death, migration; cohort tables; projection.",                                                  zh: "生、卒、迁——队列表与预测。" } },
      { id: "metabolic-feas", name: { en: "Metabolic Feasibility",    zh: "代谢可行性" },     body: { en: "Cross-checks proposals against metabolic energy ceilings (interfaces with Reality Kernel).",                zh: "对提案进行代谢能上限的交叉检验（与 Reality Kernel 接口）。" } },
    ],
    dataModel: {
      name: { en: "Organism / Population", zh: "Organism / Population（个体／种群）" },
      fields: [
        { key: "id",          type: "uuid",        note: { en: "Organism or population id",            zh: "个体或种群 id" } },
        { key: "scale",       type: "enum",        note: { en: "{cell, tissue, organism, population}", zh: "{细胞、组织、个体、种群}" } },
        { key: "genome_hash", type: "bytes32",     note: { en: "Genome reference",                      zh: "基因组引用" } },
        { key: "neural_state",type: "tensor",      note: { en: "Current activation state (if neural)",  zh: "当前激活状态（若为神经层）" } },
        { key: "energy",      type: "kJ",          note: { en: "Metabolic energy budget",               zh: "代谢能预算" } },
      ],
    },
    apis: [
      { to: "civilization-os", contract: { en: "Provide population-level projections.",         zh: "提供人口层面的预测。" },                       signature: "GET /life/projection" },
      { to: "decision-os",     contract: { en: "Provide neural decision priors per individual.",zh: "按个体提供神经决策先验。" },                    signature: "GET /life/{id}/neural" },
      { to: "sensory-os",      contract: { en: "Provide perceptual substrate parameters.",     zh: "提供知觉基底参数。" },                          signature: "GET /life/{id}/percept-substrate" },
      { to: "reality-kernel",  contract: { en: "Submit metabolic feasibility queries.",        zh: "提交代谢可行性查询。" },                        signature: "POST /metabo/feasibility" },
      { to: "clan-civilization",contract: { en: "Push birth/death/marriage events.",           zh: "推送生/卒/婚事件。" },                          signature: "POST /life/events" },
    ],
    equations: [
      { expr: "dN/dt = r·N·(1 − N/K)",                                                                  caption: { en: "Logistic — population growth bounded by carrying capacity.",                            zh: "Logistic——种群增长受承载容量约束。" } },
      { expr: "ΔP(allele) = s·p(1−p) — selection differential",                                          caption: { en: "Allele frequency change per generation under selection coefficient s.",                  zh: "在选择系数 s 下，每代等位基因频率的变化。" } },
      { expr: "Brain ≈ minimum-description-length world model",                                           caption: { en: "Empirical: cortex compresses sensory streams into compact predictive structure.",         zh: "经验观察：皮层把感觉流压缩为紧凑的预测结构。" } },
    ],
    uiScreens: [
      { en: "Multi-scale life dashboard (cell ↔ population)",       zh: "多尺度生命仪表盘（细胞 ↔ 种群）" },
      { en: "Genome browser with civ overlay",                       zh: "带文明叠加层的基因组浏览器" },
      { en: "Demographic projection sandbox",                        zh: "人口预测沙盒" },
      { en: "Metabolic feasibility query console",                   zh: "代谢可行性查询控制台" },
    ],
  },
];

export const SYSTEM_BY_ID: Record<string, System> = Object.fromEntries(SYSTEMS.map((s) => [s.id, s]));

// Inter-system dependency graph: edges go from caller → callee
// (Each system's apis[] defines its outbound calls — this is the index.)
export const DEPENDENCY_EDGES: { from: string; to: string }[] = SYSTEMS.flatMap((s) =>
  s.apis
    .filter((a) => a.to !== "*" && a.to !== "memory-os") // memory-os not in this 10
    .map((a) => ({ from: s.id, to: a.to }))
);

export const ECOSYSTEM_NAME: Bilingual = { en: "Civilization OS Ecosystem", zh: "文明操作系统生态" };
export const ECOSYSTEM_HUB: Bilingual = { en: "civos", zh: "civos" };

export const SHARED_ONTOLOGY: { entity: Bilingual; lives_in: string; appears_as: Bilingual }[] = [
  { entity: { en: "Civilization",  zh: "文明" },          lives_in: "civilization-os",      appears_as: { en: "Top-level container", zh: "顶层容器" } },
  { entity: { en: "Population",    zh: "人口" },          lives_in: "life-os",              appears_as: { en: "Aggregate of organisms", zh: "个体之聚合" } },
  { entity: { en: "Resource",      zh: "资源" },          lives_in: "material-civilization",appears_as: { en: "Material + energy unit", zh: "材料 + 能量单位" } },
  { entity: { en: "Institution",   zh: "制度" },          lives_in: "decision-os",          appears_as: { en: "Stable rule set", zh: "稳定规则集" } },
  { entity: { en: "Lineage",       zh: "世系" },          lives_in: "clan-civilization",    appears_as: { en: "Trust-network anchor", zh: "信任网络之锚" } },
  { entity: { en: "Idea",          zh: "思想" },          lives_in: "idea-evolution",       appears_as: { en: "Replicating cultural pattern", zh: "可复制的文化模式" } },
  { entity: { en: "Percept",       zh: "知觉" },          lives_in: "sensory-os",           appears_as: { en: "Predictive inference output", zh: "预测推断输出" } },
  { entity: { en: "Phase",         zh: "相位" },          lives_in: "cycle-engine",         appears_as: { en: "Position in a cycle archetype", zh: "周期原型中的位置" } },
  { entity: { en: "Realm",         zh: "Realm" },        lives_in: "psy-protocol-spec",    appears_as: { en: "State-machine partition", zh: "状态机分区" } },
  { entity: { en: "PhysicalLaw",   zh: "物理定律" },      lives_in: "reality-kernel",       appears_as: { en: "Substrate constraint",   zh: "基底约束" } },
];
