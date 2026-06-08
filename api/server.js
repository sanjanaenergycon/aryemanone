const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ── MIDDLEWARE ────────────────────────────────────────────────────────────────
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// ── IN-MEMORY DATABASE (Replace with MongoDB later) ──────────────────────────
// Real leads from your Excel file
let leadsDB = [
  { id:1,  phone:"+91 6000560935",  district:"Kamrup",    state:"Assam",          assigned_to:"Praveen",    status:"New", date:"2026-06-04" },
  { id:2,  phone:"+91 9345115918",  district:"Kamrup",    state:"Assam",          assigned_to:"Praveen",    status:"New", date:"2026-06-04" },
  { id:3,  phone:"+91 9435546850",  district:"Kamrup",    state:"Assam",          assigned_to:"Praveen",    status:"New", date:"2026-06-04" },
  { id:4,  phone:"+91 9864129699",  district:"Kamrup",    state:"Assam",          assigned_to:"Praveen",    status:"New", date:"2026-06-04" },
  { id:5,  phone:"+91 9435097758",  district:"Kamrup",    state:"Assam",          assigned_to:"Praveen",    status:"New", date:"2026-06-04" },
  { id:6,  phone:"+91 6266758117",  district:"Patan",     state:"Gujarat",        assigned_to:"Praveen",    status:"New", date:"2026-06-04" },
  { id:7,  phone:"+91 7666769085",  district:"Patan",     state:"Gujarat",        assigned_to:"Praveen",    status:"New", date:"2026-06-04" },
  { id:8,  phone:"+91 8709625896",  district:"Patan",     state:"Gujarat",        assigned_to:"Praveen",    status:"New", date:"2026-06-04" },
  { id:9,  phone:"+91 9412462125",  district:"Patan",     state:"Gujarat",        assigned_to:"Praveen",    status:"New", date:"2026-06-04" },
  { id:10, phone:"+91 9850651731",  district:"Patan",     state:"Gujarat",        assigned_to:"Praveen",    status:"New", date:"2026-06-04" },
  { id:11, phone:"+91 6205627096",  district:"Araria",    state:"Bihar",          assigned_to:"Priti",      status:"New", date:"2026-06-04" },
  { id:12, phone:"+91 7250329392",  district:"Araria",    state:"Bihar",          assigned_to:"Priti",      status:"New", date:"2026-06-04" },
  { id:13, phone:"+91 7277953248",  district:"Araria",    state:"Bihar",          assigned_to:"Priti",      status:"New", date:"2026-06-04" },
  { id:14, phone:"+91 8809926187",  district:"Araria",    state:"Bihar",          assigned_to:"Priti",      status:"New", date:"2026-06-04" },
  { id:15, phone:"+91 9304126048",  district:"Araria",    state:"Bihar",          assigned_to:"Priti",      status:"New", date:"2026-06-04" },
  { id:16, phone:"+91 7276026060",  district:"Ahmednagar",state:"Maharashtra",    assigned_to:"Priti",      status:"New", date:"2026-06-04" },
  { id:17, phone:"+91 8308474643",  district:"Ahmednagar",state:"Maharashtra",    assigned_to:"Priti",      status:"New", date:"2026-06-04" },
  { id:18, phone:"+91 9545244004",  district:"Ahmednagar",state:"Maharashtra",    assigned_to:"Priti",      status:"New", date:"2026-06-04" },
  { id:19, phone:"+91 9579028581",  district:"Ahmednagar",state:"Maharashtra",    assigned_to:"Priti",      status:"New", date:"2026-06-04" },
  { id:20, phone:"+91 9145264919",  district:"Ahmednagar",state:"Maharashtra",    assigned_to:"Priti",      status:"New", date:"2026-06-04" },
  { id:21, phone:"+91 9729033317",  district:"Ambala",    state:"Haryana",        assigned_to:"Neetu",      status:"New", date:"2026-06-04" },
  { id:22, phone:"+91 9896609580",  district:"Ambala",    state:"Haryana",        assigned_to:"Neetu",      status:"New", date:"2026-06-04" },
  { id:23, phone:"+91 9996530087",  district:"Ambala",    state:"Haryana",        assigned_to:"Neetu",      status:"New", date:"2026-06-04" },
  { id:24, phone:"+91 8901869195",  district:"Ambala",    state:"Haryana",        assigned_to:"Neetu",      status:"New", date:"2026-06-04" },
  { id:25, phone:"+91 9996530087",  district:"Ambala",    state:"Haryana",        assigned_to:"Neetu",      status:"New", date:"2026-06-04" },
  { id:26, phone:"+91 9634686022",  district:"Aligarh",   state:"Uttar Pradesh",  assigned_to:"Neetu",      status:"New", date:"2026-06-04" },
  { id:27, phone:"+91 9528386580",  district:"Aligarh",   state:"Uttar Pradesh",  assigned_to:"Neetu",      status:"New", date:"2026-06-04" },
  { id:28, phone:"+91 8057901315",  district:"Aligarh",   state:"Uttar Pradesh",  assigned_to:"Neetu",      status:"New", date:"2026-06-04" },
  { id:29, phone:"+91 7906418516",  district:"Aligarh",   state:"Uttar Pradesh",  assigned_to:"Neetu",      status:"New", date:"2026-06-04" },
  { id:30, phone:"+91 9548894093",  district:"Aligarh",   state:"Uttar Pradesh",  assigned_to:"Neetu",      status:"New", date:"2026-06-04" },
  { id:31, phone:"+91 9918563849",  district:"Amethi",    state:"Uttar Pradesh",  assigned_to:"Rushpinder", status:"New", date:"2026-06-04" },
  { id:32, phone:"+91 7080498695",  district:"Amethi",    state:"Uttar Pradesh",  assigned_to:"Rushpinder", status:"New", date:"2026-06-04" },
  { id:33, phone:"+91 6389794814",  district:"Amethi",    state:"Uttar Pradesh",  assigned_to:"Rushpinder", status:"New", date:"2026-06-04" },
  { id:34, phone:"+91 9235873048",  district:"Amethi",    state:"Uttar Pradesh",  assigned_to:"Rushpinder", status:"New", date:"2026-06-04" },
  { id:35, phone:"+91 8009633392",  district:"Amethi",    state:"Uttar Pradesh",  assigned_to:"Rushpinder", status:"New", date:"2026-06-04" },
  { id:36, phone:"+91 9779524046",  district:"Amritsar",  state:"Punjab",         assigned_to:"Rushpinder", status:"New", date:"2026-06-04" },
  { id:37, phone:"+91 9356403388",  district:"Amritsar",  state:"Punjab",         assigned_to:"Rushpinder", status:"New", date:"2026-06-04" },
  { id:38, phone:"+91 9781060528",  district:"Amritsar",  state:"Punjab",         assigned_to:"Rushpinder", status:"New", date:"2026-06-04" },
  { id:39, phone:"+91 8427380628",  district:"Amritsar",  state:"Punjab",         assigned_to:"Rushpinder", status:"New", date:"2026-06-04" },
  { id:40, phone:"+91 9815612287",  district:"Amritsar",  state:"Punjab",         assigned_to:"Rushpinder", status:"New", date:"2026-06-04" },
  { id:41, phone:"+91 7091824340",  district:"Deoghar",   state:"Jharkhand",      assigned_to:"Pragati",    status:"New", date:"2026-06-04" },
  { id:42, phone:"+91 6202624626",  district:"Deoghar",   state:"Jharkhand",      assigned_to:"Pragati",    status:"New", date:"2026-06-04" },
  { id:43, phone:"+91 9939295985",  district:"Deoghar",   state:"Jharkhand",      assigned_to:"Pragati",    status:"New", date:"2026-06-04" },
  { id:44, phone:"+91 8002648386",  district:"Deoghar",   state:"Jharkhand",      assigned_to:"Pragati",    status:"New", date:"2026-06-04" },
  { id:45, phone:"+91 9263634046",  district:"Deoghar",   state:"Jharkhand",      assigned_to:"Pragati",    status:"New", date:"2026-06-04" },
  { id:46, phone:"+91 7665058181",  district:"Ujjain",    state:"Madhya Pradesh", assigned_to:"Pragati",    status:"New", date:"2026-06-04" },
  { id:47, phone:"+91 9826220680",  district:"Ujjain",    state:"Madhya Pradesh", assigned_to:"Pragati",    status:"New", date:"2026-06-04" },
  { id:48, phone:"+91 8349070991",  district:"Ujjain",    state:"Madhya Pradesh", assigned_to:"Pragati",    status:"New", date:"2026-06-04" },
  { id:49, phone:"+91 9669831999",  district:"Ujjain",    state:"Madhya Pradesh", assigned_to:"Pragati",    status:"New", date:"2026-06-04" },
  { id:50, phone:"+91 9340476939",  district:"Ujjain",    state:"Madhya Pradesh", assigned_to:"Pragati",    status:"New", date:"2026-06-04" },
  { id:51, phone:"+91 9433140913",  district:"Burdwan",   state:"West Bengal",    assigned_to:"Ruby",       status:"New", date:"2026-06-04" },
  { id:52, phone:"+91 9832099565",  district:"Burdwan",   state:"West Bengal",    assigned_to:"Ruby",       status:"New", date:"2026-06-04" },
  { id:53, phone:"+91 8101838835",  district:"Burdwan",   state:"West Bengal",    assigned_to:"Ruby",       status:"New", date:"2026-06-04" },
  { id:54, phone:"+91 9647540419",  district:"Burdwan",   state:"West Bengal",    assigned_to:"Ruby",       status:"New", date:"2026-06-04" },
  { id:55, phone:"+91 9800791312",  district:"Burdwan",   state:"West Bengal",    assigned_to:"Ruby",       status:"New", date:"2026-06-04" },
  { id:56, phone:"+91 9163232817",  district:"Jaipur",    state:"Rajasthan",      assigned_to:"Ruby",       status:"New", date:"2026-06-04" },
  { id:57, phone:"+91 9928093801",  district:"Jaipur",    state:"Rajasthan",      assigned_to:"Ruby",       status:"New", date:"2026-06-04" },
  { id:58, phone:"+91 8003560050",  district:"Jaipur",    state:"Rajasthan",      assigned_to:"Ruby",       status:"New", date:"2026-06-04" },
  { id:59, phone:"+91 9309437621",  district:"Jaipur",    state:"Rajasthan",      assigned_to:"Ruby",       status:"New", date:"2026-06-04" },
  { id:60, phone:"+91 7023124487",  district:"Jaipur",    state:"Rajasthan",      assigned_to:"Ruby",       status:"New", date:"2026-06-04" },
];

let dealsDB = [
  { id:1, title:"Tunnel Kiln System — Kamrup", contact:"Praveen", stage:"Negotiation", value:"4500000", business:"Kiln Consultancy", closeDate:"2026-09-30", probability:85 },
  { id:2, title:"Kiln BOM — Patan", contact:"Praveen", stage:"Proposal", value:"1850000", business:"Kiln Consultancy", closeDate:"2026-08-15", probability:60 },
  { id:3, title:"Kiln Design — Araria", contact:"Priti", stage:"Qualified", value:"1200000", business:"Kiln Consultancy", closeDate:"2026-10-01", probability:40 },
  { id:4, title:"Kiln Setup — Amritsar", contact:"Rushpinder", stage:"Negotiation", value:"2200000", business:"Kiln Consultancy", closeDate:"2026-08-30", probability:75 },
  { id:5, title:"Kiln Project — Aligarh", contact:"Neetu", stage:"Closed Won", value:"350000", business:"Kiln Consultancy", closeDate:"2026-06-01", probability:100 },
];

let usersDB = [
  { id:1, name:"Aryeman Bhatia", email:"aryeman@aryemanone.com", role:"Admin", password:"$2a$10$hashed" },
  { id:2, name:"Praveen", email:"praveen@aryemanone.com", role:"Sales Rep", password:"$2a$10$hashed" },
  { id:3, name:"Priti",   email:"priti@aryemanone.com",   role:"Sales Rep", password:"$2a$10$hashed" },
];

// ── API ROUTES ─────────────────────────────────────────────────────────────────

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), app: 'Aryeman One' });
});

// ── LEADS API ──────────────────────────────────────────────────────────────────
app.get('/api/leads', (req, res) => {
  const { assigned_to, state, status, search } = req.query;
  let result = [...leadsDB];
  if (assigned_to && assigned_to !== 'All') result = result.filter(l => l.assigned_to === assigned_to);
  if (state) result = result.filter(l => l.state === state);
  if (status) result = result.filter(l => l.status === status);
  if (search) result = result.filter(l =>
    l.phone.includes(search) || l.district.toLowerCase().includes(search.toLowerCase()) ||
    l.state.toLowerCase().includes(search.toLowerCase())
  );
  res.json({ success: true, total: result.length, data: result });
});

app.get('/api/leads/:id', (req, res) => {
  const lead = leadsDB.find(l => l.id === parseInt(req.params.id));
  if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
  res.json({ success: true, data: lead });
});

app.post('/api/leads', (req, res) => {
  const lead = {
    id: leadsDB.length + 1,
    ...req.body,
    date: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString()
  };
  leadsDB.push(lead);
  res.status(201).json({ success: true, data: lead });
});

app.put('/api/leads/:id', (req, res) => {
  const idx = leadsDB.findIndex(l => l.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ success: false, message: 'Lead not found' });
  leadsDB[idx] = { ...leadsDB[idx], ...req.body, updatedAt: new Date().toISOString() };
  res.json({ success: true, data: leadsDB[idx] });
});

app.delete('/api/leads/:id', (req, res) => {
  const idx = leadsDB.findIndex(l => l.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ success: false, message: 'Lead not found' });
  leadsDB.splice(idx, 1);
  res.json({ success: true, message: 'Lead deleted' });
});

// Bulk import leads
app.post('/api/leads/bulk', (req, res) => {
  const { leads } = req.body;
  if (!Array.isArray(leads)) return res.status(400).json({ success: false, message: 'leads must be array' });
  const added = leads.map((l, i) => ({ id: leadsDB.length + i + 1, ...l, date: new Date().toISOString().split('T')[0] }));
  leadsDB.push(...added);
  res.status(201).json({ success: true, imported: added.length, data: added });
});

// Leads stats
app.get('/api/leads/stats/summary', (req, res) => {
  const byPerson = {};
  const byState = {};
  leadsDB.forEach(l => {
    byPerson[l.assigned_to] = (byPerson[l.assigned_to] || 0) + 1;
    byState[l.state] = (byState[l.state] || 0) + 1;
  });
  res.json({
    success: true,
    total: leadsDB.length,
    byPerson,
    byState,
    byStatus: leadsDB.reduce((acc, l) => { acc[l.status] = (acc[l.status] || 0) + 1; return acc; }, {})
  });
});

// ── DEALS API ──────────────────────────────────────────────────────────────────
app.get('/api/deals', (req, res) => {
  res.json({ success: true, total: dealsDB.length, data: dealsDB });
});

app.post('/api/deals', (req, res) => {
  const deal = { id: dealsDB.length + 1, ...req.body, createdAt: new Date().toISOString() };
  dealsDB.push(deal);
  res.status(201).json({ success: true, data: deal });
});

app.put('/api/deals/:id', (req, res) => {
  const idx = dealsDB.findIndex(d => d.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ success: false, message: 'Deal not found' });
  dealsDB[idx] = { ...dealsDB[idx], ...req.body };
  res.json({ success: true, data: dealsDB[idx] });
});

app.delete('/api/deals/:id', (req, res) => {
  const idx = dealsDB.findIndex(d => d.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ success: false, message: 'Deal not found' });
  dealsDB.splice(idx, 1);
  res.json({ success: true, message: 'Deal deleted' });
});

// ── DASHBOARD STATS API ────────────────────────────────────────────────────────
app.get('/api/dashboard/stats', (req, res) => {
  const totalPipeline = dealsDB.reduce((s, d) => s + (parseInt(d.value) || 0), 0);
  const closedWon = dealsDB.filter(d => d.stage === 'Closed Won').reduce((s, d) => s + (parseInt(d.value) || 0), 0);
  res.json({
    success: true,
    data: {
      totalLeads: leadsDB.length,
      totalDeals: dealsDB.length,
      pipeline: totalPipeline,
      closedWon,
      persons: [...new Set(leadsDB.map(l => l.assigned_to))],
      states: [...new Set(leadsDB.map(l => l.state))].length,
    }
  });
});

// ── ZIA AI API (Anthropic) ─────────────────────────────────────────────────────
app.post('/api/zia/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ success: false, message: 'Message required' });

  // Check if Anthropic key exists
  if (!process.env.ANTHROPIC_API_KEY) {
    // Return smart pre-built responses
    const responses = {
      'leads': `📊 Lead Summary:\n• Total: ${leadsDB.length} leads across 11 states\n• Top person: Praveen (Kamrup, Assam & Patan, Gujarat)\n• Latest: ${leadsDB[leadsDB.length-1]?.district}, ${leadsDB[leadsDB.length-1]?.state}`,
      'deals': `💼 Deal Summary:\n• Total pipeline: ₹${(dealsDB.reduce((s,d)=>s+(parseInt(d.value)||0),0)/100000).toFixed(1)}L\n• In Negotiation: ${dealsDB.filter(d=>d.stage==='Negotiation').length}\n• Closed Won: ${dealsDB.filter(d=>d.stage==='Closed Won').length}`,
      'default': `I'm Zia, your AI assistant! I can help with:\n• Lead analytics\n• Deal summaries\n• Revenue reports\n\nCurrent stats: ${leadsDB.length} leads, ${dealsDB.length} deals in pipeline.`
    };
    const key = message.toLowerCase().includes('lead') ? 'leads' : message.toLowerCase().includes('deal') ? 'deals' : 'default';
    return res.json({ success: true, reply: responses[key] });
  }

  // Call real Anthropic API
  try {
    const context = `You are Zia, AI assistant for Aryeman One CRM.
Current data: ${leadsDB.length} leads across ${[...new Set(leadsDB.map(l=>l.state))].length} states.
Field executives: Praveen, Priti, Pragati, Neetu, Rushpinder, Ruby (10 leads each).
Deals pipeline: ₹${(dealsDB.reduce((s,d)=>s+(parseInt(d.value)||0),0)/100000).toFixed(1)}L total.
Answer in 2-3 lines, be specific and data-driven.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system: context,
        messages: [{ role: 'user', content: message }]
      })
    });
    const data = await response.json();
    res.json({ success: true, reply: data.content[0].text });
  } catch (err) {
    res.status(500).json({ success: false, message: 'AI service error', error: err.message });
  }
});

// ── SEARCH API ─────────────────────────────────────────────────────────────────
app.get('/api/search', (req, res) => {
  const { q } = req.query;
  if (!q) return res.json({ success: true, data: [] });
  const results = [
    ...leadsDB.filter(l => l.phone.includes(q) || l.district.toLowerCase().includes(q.toLowerCase())).slice(0,5).map(l => ({ type:'lead', ...l })),
    ...dealsDB.filter(d => d.title.toLowerCase().includes(q.toLowerCase())).slice(0,5).map(d => ({ type:'deal', ...d })),
  ];
  res.json({ success: true, total: results.length, data: results });
});

// ── SERVE FRONTEND ─────────────────────────────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// ── START SERVER ───────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Aryeman One server running on http://localhost:${PORT}`);
  console.log(`📊 ${leadsDB.length} leads loaded`);
  console.log(`💼 ${dealsDB.length} deals loaded`);
});

module.exports = app;
