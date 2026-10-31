export const AVOGADRO = 6.02214076e23;
export const SUBSTANCES = [
 {id:'water',name:'น้ำ (H₂O)',formula:'H₂O',molarMass:18.015,entity:'โมเลกุล',kind:'molecule',parts:[['O',1],['H',2]]},
 {id:'co2',name:'คาร์บอนไดออกไซด์ (CO₂)',formula:'CO₂',molarMass:44.01,entity:'โมเลกุล',kind:'molecule',parts:[['C',1],['O',2]]},
 {id:'nacl',name:'โซเดียมคลอไรด์ (NaCl)',formula:'NaCl',molarMass:58.44,entity:'หน่วยสูตร',kind:'formula-unit',parts:[['Na',1],['Cl',1]]},
 {id:'carbon',name:'คาร์บอน (C)',formula:'C',molarMass:12.011,entity:'อะตอม',kind:'atom',parts:[['C',1]]},
 {id:'oxygen',name:'แก๊สออกซิเจน (O₂)',formula:'O₂',molarMass:31.998,entity:'โมเลกุล',kind:'molecule',parts:[['O',2]]},
 {id:'magnesium',name:'แมกนีเซียม (Mg)',formula:'Mg',molarMass:24.305,entity:'อะตอม',kind:'atom',parts:[['Mg',1]]}
];
export function gramsToMoles(grams,molarMass){if(!Number.isFinite(grams)||grams<0||!Number.isFinite(molarMass)||molarMass<=0)throw Error('Invalid mass or molar mass');return grams/molarMass}
export function molesToParticles(moles){if(!Number.isFinite(moles)||moles<0)throw Error('Invalid moles');return moles*AVOGADRO}
export function formatScientific(number,digits=3){if(number===0)return '0';const exp=Math.floor(Math.log10(Math.abs(number)));const mantissa=number/10**exp;const sup=String(exp).replace(/-/g,'⁻').replace(/\d/g,d=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(d)]);return `${mantissa.toFixed(digits)} × 10${sup}`}
export function closeEnough(a,b,absoluteTolerance=0.015){return Math.abs(a-b)<=absoluteTolerance}
// Semantic equivalence: tiles only match identical substance/quantity family and numerically equivalent moles.
// For real chemistry: particles refer to molecules/atoms/formula units as appropriate, not arbitrary atoms.
export function equivalent(a,b){return a.substance===b.substance && Math.abs(a.mol-b.mol)<1e-8}
// Printed game molar masses are intentionally rounded for consistent exact cards.
export const GAME_MASSES={water:18,co2:44,nacl:58.5,oxygen:32,carbon:12,magnesium:24.3};
const FORMULAS={water:'H₂O',co2:'CO₂',nacl:'NaCl',oxygen:'O₂',carbon:'C',magnesium:'Mg'};
const UNITS={water:'โมเลกุล',co2:'โมเลกุล',nacl:'หน่วยสูตร',oxygen:'โมเลกุล',carbon:'อะตอม',magnesium:'อะตอม'};
const specs=[['water',1],['co2',.5],['nacl',1],['oxygen',2],['water',.5],['nacl',.5],['co2',1]];
function textValue(value){return Number(value.toFixed(4)).toString()}
export function descriptor(id,mol,style){let label;if(style==='mass')label=`${textValue(GAME_MASSES[id]*mol)} g ${FORMULAS[id]}`;else if(style==='particles')label=`${formatScientific(molesToParticles(mol),2)} ${UNITS[id]} ${FORMULAS[id]}`;else label=`${textValue(mol)} mol ${FORMULAS[id]}`;return {substance:id,mol,label,style}}
// Produces a guaranteed-solvable chain. Each neighboring pair has equivalent right/left values.
export function makeDominoSet(){return specs.map((spec,i)=>({id:`D${i+1}`,left:descriptor(spec[0],spec[1],i%3===0?'mass':i%3===1?'moles':'particles'),right:descriptor(specs[(i+1)%specs.length][0],specs[(i+1)%specs.length][1],i%2===0?'moles':'mass')}))}
export function validateDominoSet(tiles){if(!Array.isArray(tiles)||tiles.length<2) return false;return tiles.every((t,i)=>equivalent(t.right,tiles[(i+1)%tiles.length].left))}
export function shuffle(array,random=Math.random){const a=[...array];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
