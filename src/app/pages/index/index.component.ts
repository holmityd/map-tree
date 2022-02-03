import { Component, OnInit,ViewChildren,ViewChild,ElementRef,QueryList,HostListener } from '@angular/core';
import data from 'poe-data/passive-skill-tree-data.json';
import abc from 'poe-data/decodeUrl';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  encodedTree = '';
  // encodedTree = 'https://poeskilltree.com/?v=3.17.0-atlas#AAAABAAAAAAbAB8AeQCeALoAzgHAAxQDHwOhBG8EmATWBNsFEwU7BpMHiAfXB-IIGwg_CGwIyQjkCdwJ-AoZCj0KQApXCmEKvgr7CwoLJAtxDOAOsw6-DtMO4g8tD2MPzBCwENwQ4REGEYkRmhJIEsAUdxTaFWEVsRXAFsQXFBeQF8sX7hgbGDkYuxjEGX4ZghtOG2Qc1h10Hh0eWx59HzgfZh_EH_YgKyFrIcUiayPaJMsk6STvJf4mWCaKJuco0CjpKYcqhCrRK0EraCt-K4YruivXK9oseiz8LdAuiy6-LwQvRi9uL5wwAzAOMDUwZjFrMiQySzMgM0kz5DQ9NIg0pDSmNa41zTZdOG85jjpGOq87nz5CPl8-wT80P80_40A8QG1AfkFfQYxCDEITQiVCc0J3QsFDI0NLQ6lEc0SWRJpFo0XhRw1Hz0gASCJILEiwSbxJyknTSdRKDkpfTatN_E5vT11PYU-JT9hQF1A5UYJSO1M4U2FTolP7VYdWRVZGVm1XJFfjWAJYRVibWKdYqVjBWRRZFlk8WcxaNFp9WptayVrOW9lb81yMXNlc3F0TXU9dt13HXipe918YX1Nf62AhYE1gZ2B7YUhiKWJ_YrhjAWO1ZExkjWSyZWtlfWWXZaRmtWbGZspnLmedZ-loQGhSaKFosmi2aR5pm2nVadxqz2sCazZsD2xJbH5skGzMbNRs_W19baVt_W4Gbipvf3AhcEBwUHBkcQtxK3KIcsty3HOLc6Vz4nP4dPp1E3UndUN2RXZUdp12wncUdyx3tXiEeTd5nnnDegF6tnr0ev17CnunfMV8z30TfR19Pn9cf6R_s3_cgGSAeIEPgVqCUYJpgoqDlIPDg92EEYRuhH2FJ4XEhpiH6Yf7iBmIOIhtiKOJMIlCiZGKyYrRixiLLIz9jSmNTo2hjmqOg46Ijx2Pt4_UkKmQ45EykU2RfZGMkcSRx5IEkiySTJKwkteTQJThla2WzZdFl8OY2JkMmTiZbJlzmZGZ6pwrnTidXp2HnbGeSaBdoXihtaHRoeKi3qMZo2yjbqOFo4mjxqQPpDakSqSspSSlXKV4pa6l0KXYpm2mxKbap4KoL6j0qP2qtaq5q22rfKusrBCsGqwfrNmtXK23rdauAq5irueu6q_Br8Wxc7GCsfuyZrMts4y0hrURtWe1fbX9tiq26Lb4tyu3SLeBt8u3zLhKuYC6F7pMurK6yrrvuwm7KrtevKi83L44vme-178Wv0C_ssAZwLrA9cGGwcfC_8NNw6rEScUCxVbF_sYzxjjGm8bQxtnHs8e0yGDIfsjlyaHKH8p6yyvLy8z5znrOg86Rz7fPyc_y0ErQUNCi0KnRJNFN0WPRqdL00zjTXdNe1IfUudTj1UTVZtYt1jDWWtZb1qDW29ce103XVteF2I7Ynti12NDZhdmQ2a3ZuNnn2k3avdrO24fcTdy_3RzdaN713yPfS99e3_jgFuBr4YvhqeHr4nHil-Kn4vXjcON85Izlj-W35ezl-uYm5k_m9Oco51jnlufh6Czo0uja6ObpH-nT6mnqjerK6tPq1et-7EnsTOzl7RPtWe2g7lzulO7B76nvrvFL8d7yZfKT8ujzBPNs8-P0DPVM9Xf1qPYN9lL3T_fk-CH4zvj6-QD5Dvow-mj6svra-vz70Pv5_AT8zvzm_Pb9Hf3J_dH-3g==';
  data = data;
  tree?: number[];
  nodes?: any[];
  stats?: string[];
  categoried = [
    {
      key: 'maps',
      cond: (e: string) => this._findKeysInString(e, [
        'fortune favours the brave',
        'quantity of items found in areas',
        'rarity of items found in areas',
        'map drops',
        'modifiers on non-unique maps',
        'maps dropped',
        'favoured maps',
        'map crafting'
      ]),
      img: '',
      stats: []
    },
    {
      key: 'map boss',
      cond: (e: string) => this._findKeysInString(e, ['unique bosses','map bosses']),
      img: '',
      stats: []
    },
    {
      key: 'unique maps',
      cond: (e: string) => this._findKeysInString(e, ['unique map instead','unique maps have']),
      img: '',
      stats: []
    },
    {
      key: 'betrayal',
      cond: (e: string) => this._findKeysInString(e, ['syndicate', 'jun mission']),
      img: '',
      stats: []
    },
    {
      key: 'strongboxes',
      cond: (e: string) => this._findKeysInString(e, ['strongbox']),
      img: '',
      stats: []
    },
    {
      key: 'essence',
      cond: (e: string) => this._findKeysInString(e, ['essence', 'corrupting imprisoned']),
      img: '',
      stats: []
    },
    {
      key: 'bestiary',
      cond: (e: string) => this._findKeysInString(e, ['beast','einhar']),
      img: '',
      stats: []
    },
    {
      key: 'metamorph',
      cond: (e: string) => this._findKeysInString(e, ['metamorph','oils']),
      img: '',
      stats: []
    },
    {
      key: 'harvest',
      cond: (e: string) => this._findKeysInString(e, ['harvest', 'sacred grove']),
      img: '',
      stats: []
    },
    {
      key: 'kirac',
      cond: (e: string) => this._findKeysInString(e, ['kirac','scouting reports']),
      img: '',
      stats: []
    },
    {
      key: 'beyond',
      cond: (e: string) => this._findKeysInString(e, ['beyond']),
      img: '',
      stats: []
    },
    {
      key: 'blight',
      cond: (e: string) => this._findKeysInString(e, ['blight']),
      img: '',
      stats: []
    },
    {
      key: 'breach',
      cond: (e: string) => this._findKeysInString(e, ['breach']),
      img: '',
      stats: []
    },
    {
      key: 'delve',
      cond: (e: string) => this._findKeysInString(e, ['sulphite','niko mission']),
      img: '',
      stats: []
    },
    {
      key: 'torment',
      cond: (e: string) => this._findKeysInString(e, ['torment','possessed']),
      img: '',
      stats: []
    },
    {
      key: 'delirium',
      cond: (e: string) => this._findKeysInString(e, ['delirium','simulacrum']),
      img: '',
      stats: []
    },
    {
      key: 'legion',
      cond: (e: string) => this._findKeysInString(e, ['legion','timeless splinters']),
      img: '',
      stats: []
    },
    {
      key: 'abyss',
      cond: (e: string) => this._findKeysInString(e, ['abyss']),
      img: '',
      stats: []
    },
    {
      key: 'scarabs',
      cond: (e: string) => this._findKeysInString(e, ['scarab']),
      img: '',
      stats: []
    },
    {
      key: 'vaal side areas',
      cond: (e: string) => this._findKeysInString(e, ['vaal']),
      img: '',
      stats: []
    },
    {
      key: 'ritual',
      cond: (e: string) => this._findKeysInString(e, ['ritual']),
      img: '',
      stats: []
    },
    {
      key: 'shrines',
      cond: (e: string) => this._findKeysInString(e, ['shrine']),
      img: '',
      stats: []
    },
    {
      key: 'the eater of worlds',
      cond: (e: string) => this._findKeysInString(e, ['eater of world']),
      img: '',
      stats: []
    },
    {
      key: 'incursion',
      cond: (e: string) => this._findKeysInString(e, ['alva','incursion','architects']),
      img: '',
      stats: []
    },
    {
      key: 'expedition',
      cond: (e: string) => this._findKeysInString(e, ['vendor refresh','expedition','explosive','artifacts','remnants','runic monster markers']),
      img: '',
      stats: []
    },
    {
      key: 'heist',
      cond: (e: string) => this._findKeysInString(e, ['rogue','bounty target','smuggler','blueprints']),
      img: '',
      stats: []
    },
    {
      key: 'labyrinth',
      cond: (e: string) => this._findKeysInString(e, ['trial of ascendancy','labyrinth']),
      img: '',
      stats: []
    },
    {
      key: 'rare monsters',
      cond: (e: string) => this._findKeysInString(e, ['rare monster in areas','rare monsters in areas']),
      img: '',
      stats: []
    },
    {
      key: 'harbinger',
      cond: (e: string) => this._findKeysInString(e, ['harbinger']),
      img: '',
      stats: []
    },
    {
      key: 'the searing exarch',
      cond: (e: string) => this._findKeysInString(e, ['searing exarch','influenced monster','the black star']),
      img: '',
      stats: []
    },
    {
      key: 'elderslayers',
      cond: (e: string) => this._findKeysInString(e, ['conqueror','sirus']),
      img: '',
      stats: []
    },
    {
      key: 'the shaper and elder',
      cond: (e: string) => this._findKeysInString(e, ['shaper','elder']),
      img: '',
      stats: []
    },
    {
      key: 'synthesis',
      cond: (e: string) => this._findKeysInString(e, ['synthesis']),
      img: '',
      stats: []
    },
    {
      key: 'sextants',
      cond: (e: string) => this._findKeysInString(e, ['sextant']),
      img: '',
      stats: []
    },
    {
      key: 'rogue exiles',
      cond: (e: string) => this._findKeysInString(e, ['rogue exile']),
      img: '',
      stats: []
    },
    {
      key: 'maven',
      cond: (e: string) => this._findKeysInString(e, ['maven','orbs of conflict']),
      img: '',
      stats: []
    },
    {
      key: 'other',
      cond: (e: string) => !this._findKeysInString(e, [
        'syndicate', 
        'strongbox', 
        'beast', 
        'metamorph', 
        'essence', 
        'harvest', 
        'kirac', 
        'jun mission', 
        'sacred grove', 
        'corrupting imprisoned',
        'beyond',
        'blight',
        'torment',
        'einhar',
        'breach',
        'sulphite',
        'delirium',
        'legion',
        'abyss',
        'scarab',
        'vaal',
        'ritual',
        'shrine',
        'eater of world',
        'alva',
        'incursion',
        'vendor refresh',
        'expedition',
        'possessed',
        'rogue',
        'bounty target',
        'unique bosses',
        'map bosses',
        'trial of ascendancy',
        'rare monster',
        'harbinger',
        'explosive',
        'searing exarch',
        'influenced monster',
        'smuggler',
        'blueprints',
        'artifacts',
        'conqueror',
        'shaper',
        'timeless splinters',
        'scouting reports',
        'sirus',
        'niko mission',
        'synthesis',
        'architects',
        'sextant',
        'simulacrum',
        'the black star',
        'labyrinth',
        'remnants',
        'runic monster markers',
        'oils',
        'maven',
        'elder',
        'orbs of conflict',
        'fortune favours the brave',
        'quantity of items found in areas',
        'rarity of items found in areas',
        'map drops',
        'modifiers on non-unique maps',
        'unique map instead in areas',
        'maps dropped',
        'unique maps have',
        'favoured maps',
        'map crafting',
        'rogue exile'
      ]),
      img: '',
      stats: [] as string[]
    }
  ]

  private _findKeysInString(str: string, keys: string[]): boolean {
    return keys.map(item => str.includes(item)).find(item => item) || false;
  }
  private getKey(str: string): string {
    return (str.indexOf('#') != -1 ? str.split('#').pop() : str.split('/').pop()) || '';
  }
  onChange() {
    this.encodedTree = this.getKey(this.encodedTree);
    if(!this.encodedTree) return;
    this.tree = abc.decode(this.encodedTree);
    this.nodes = this.tree?.map(item => (data.nodes as any)[item]);

    const counts: any = {};
    let stats: string[] = [];
    this.nodes?.forEach(item => item.stats.forEach((stat: string) => stats.push(stat)));
    stats.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    this.stats = Object.keys(counts).map((key) => key.replace(/[+-]?([0-9]*[.])?[0-9]+/g, match => (parseFloat(match) * counts[key]).toString()));

    this.categoried.forEach(category => {
      category.stats = this.stats?.filter(item => category.cond(item.toLowerCase())) || [];
    });

    setTimeout(()=>this.masonry());
  }

  ngOnInit(){
    this.onChange();
    this.categoried.forEach(category=>{
      let find: any = Object.values(data.nodes).find((item:any)=>item.name?.toLowerCase()==category.key?.toLowerCase());
      category.img = find?.icon.split('/').pop().replace('.png','');
    });
  }

  // Masonry grid
  @ViewChild('grid', { read: ElementRef }) grid?: ElementRef;
  @ViewChildren('gridCell', { read: ElementRef }) gridCell?: QueryList<ElementRef>;
  onToggle(){
    setTimeout(()=>this.masonry());
  }
  masonry(gridGutter=10, dGridCol=3, tGridCol=2, mGridCol=1) {
    if(!this.grid || !this.gridCell) return;
    var g = this.grid.nativeElement,
        gc = this.gridCell.toArray().map(item=>item.nativeElement),
        gcLength = gc.length,
        gHeight = 0,
        i;
    
    for(i=0; i<gcLength; ++i) {
      gHeight+=gc[i].offsetHeight+gridGutter;
    }

    console.log(gHeight);

    if(window.screen.width >= 1024) {
      g.style.height = gHeight/dGridCol + gHeight/(gcLength+1) + "px";
    } else if(window.screen.width < 1024 && window.screen.width >= 768) {
      g.style.height = gHeight/tGridCol + gHeight/(gcLength+1) + "px";
    } else {
      g.style.height = gHeight/mGridCol + gHeight/(gcLength+1) + "px";
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.masonry();
  }
  ngAfterViewInit(){
    this.masonry();
  }
}
