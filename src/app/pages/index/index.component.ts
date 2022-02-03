import { Component, OnInit, ViewChildren, ViewChild, ElementRef, QueryList, HostListener } from '@angular/core';
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
  tree?: number[];
  nodes?: any[];
  stats?: string[];
  categoried: {
    name: string,
    keys: string[],
    img?: string,
    stats?: string[]
  }[] = [
      {
        name: 'maps',
        keys: [
          'fortune favours the brave',
          'quantity of items found in areas',
          'rarity of items found in areas',
          'map drops',
          'modifiers on non-unique maps',
          'maps dropped',
          'favoured maps',
          'map crafting'
        ]
      },
      {
        name: 'map boss',
        keys: ['unique bosses', 'map bosses']
      },
      {
        name: 'unique maps',
        keys: ['unique map instead', 'unique maps have']
      },
      {
        name: 'betrayal',
        keys: ['syndicate', 'jun mission']
      },
      {
        name: 'strongboxes',
        keys: ['strongbox']
      },
      {
        name: 'essence',
        keys: ['essence', 'corrupting imprisoned']
      },
      {
        name: 'bestiary',
        keys: ['beast', 'einhar']
      },
      {
        name: 'metamorph',
        keys: ['metamorph', 'oils']
      },
      {
        name: 'harvest',
        keys: ['harvest', 'sacred grove']
      },
      {
        name: 'kirac',
        keys: ['kirac', 'scouting reports']
      },
      {
        name: 'beyond',
        keys: ['beyond']
      },
      {
        name: 'blight',
        keys: ['blight']
      },
      {
        name: 'breach',
        keys: ['breach']
      },
      {
        name: 'delve',
        keys: ['sulphite', 'niko mission']
      },
      {
        name: 'torment',
        keys: ['torment', 'possessed']
      },
      {
        name: 'delirium',
        keys: ['delirium', 'simulacrum']
      },
      {
        name: 'legion',
        keys: ['legion', 'timeless splinters']
      },
      {
        name: 'abyss',
        keys: ['abyss']
      },
      {
        name: 'scarabs',
        keys: ['scarab']
      },
      {
        name: 'vaal side areas',
        keys: ['vaal']
      },
      {
        name: 'ritual',
        keys: ['ritual']
      },
      {
        name: 'shrines',
        keys: ['shrine']
      },
      {
        name: 'the eater of worlds',
        keys: ['eater of world']
      },
      {
        name: 'incursion',
        keys: ['alva', 'incursion', 'architects']
      },
      {
        name: 'expedition',
        keys: ['vendor refresh', 'expedition', 'explosive', 'artifacts', 'remnants', 'runic monster markers']
      },
      {
        name: 'heist',
        keys: ['rogue', 'bounty target', 'smuggler', 'blueprints']
      },
      {
        name: 'labyrinth',
        keys: ['trial of ascendancy', 'labyrinth']
      },
      {
        name: 'rare monsters',
        keys: ['rare monster in areas', 'rare monsters in areas']
      },
      {
        name: 'harbinger',
        keys: ['harbinger']
      },
      {
        name: 'the searing exarch',
        keys: ['searing exarch', 'influenced monster', 'the black star']
      },
      {
        name: 'elderslayers',
        keys: ['conqueror', 'sirus']
      },
      {
        name: 'the shaper and elder',
        keys: ['shaper', 'elder']
      },
      {
        name: 'synthesis',
        keys: ['synthesis']
      },
      {
        name: 'sextants',
        keys: ['sextant']
      },
      {
        name: 'rogue exiles',
        keys: ['rogue exile']
      },
      {
        name: 'maven',
        keys: ['maven', 'orbs of conflict']
      }
    ];

  // Get tree
  private _findKeysInString(str: string, keys: string[]): boolean {
    return keys.map(item => str.includes(item)).find(item => item) || false;
  }
  private getKey(str: string): string {
    return (str.indexOf('#') != -1 ? str.split('#').pop() : str.split('/').pop()) || '';
  }
  onChange() {
    this.encodedTree = this.getKey(this.encodedTree);
    if (!this.encodedTree) return;
    this.tree = abc.decode(this.encodedTree);
    this.nodes = this.tree ?.map(item => (data.nodes as any)[item]);

    const counts: any = {};
    let stats: string[] = [];
    this.nodes ?.forEach(item => item.stats.forEach((stat: string) => stats.push(stat)));
    stats.forEach(function(x) { counts[x] = (counts[x] || 0) + 1; });
    this.stats = Object.keys(counts).map((key) => key.replace(/[+-]?([0-9]*[.])?[0-9]+/, match => (parseFloat(match) * counts[key]).toString()));

    let tempStats = this.stats;
    this.categoried.forEach(category => {
      let filtered = tempStats ?.filter(item => this._findKeysInString(item.toLowerCase(), category.keys));
      if (filtered) {
        category.stats = filtered;
        tempStats = tempStats.filter(item => filtered.indexOf(item) < 0);
      }
    });

    setTimeout(() => this.masonry());
  }
  ngOnInit() {
    this.onChange();
    this.categoried.forEach(category => {
      let find: any = Object.values(data.nodes).find((item: any) => item.name ?.toLowerCase() == category.name ?.toLowerCase());
      category.img = find ?.icon.split('/').pop().replace('.png', '');
    });
  }

  // Masonry grid
  @ViewChild('grid', { read: ElementRef }) grid?: ElementRef;
  @ViewChildren('gridCell', { read: ElementRef }) gridCell?: QueryList<ElementRef>;
  onToggle() {
    setTimeout(() => this.masonry());
  }
  masonry(gridGutter = 10, dGridCol = 3, tGridCol = 2, mGridCol = 1) {
    if (!this.grid || !this.gridCell) return;
    let gHeight = 0;
    let dGrids = window.innerWidth >= 1024 ?
      dGridCol :
      window.innerWidth < 1024 && window.innerWidth >= 768 ?
        tGridCol : mGridCol;
    this.gridCell.toArray().forEach(item => {
      gHeight += item.nativeElement.offsetHeight + gridGutter;
    });
    this.grid.nativeElement.style.height = gHeight / dGrids + gHeight / (this.gridCell.length + 1) + "px";
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.masonry();
  }
  ngAfterViewInit() {
    this.masonry();
  }
}
