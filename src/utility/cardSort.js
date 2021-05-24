export default function cardSort(cards, sortParam) {
	switch(sortParam) {
		case 'NAME_ASC':
			cards.sort(function (a,b) {
				var nameA = a.name.toUpperCase(); 
				var nameB = b.name.toUpperCase(); 
				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}
				return 0;
			});
			break;
		case 'NAME_DESC':
			cards.sort(function (a,b) {
				var nameA = a.name.toUpperCase(); 
				var nameB = b.name.toUpperCase(); 
				if (nameA > nameB) {
					return -1;
				}
				if (nameA < nameB) {
					return 1;
				}
				return 0;
			});
			break;
		case 'COST_ASC':
			cards.sort(function (a,b) {
				if(!a.cost) a.cost = 0;
				if(!b.cost) b.cost = 0;

				return b.cost - a.cost;
			});
			break;
		case 'COST_DESC':
			cards.sort(function (a,b) {
				if(!a.cost) a.cost = 0;
				if(!b.cost) b.cost = 0;

				return a.cost - b.cost;
			});
			break;
		case 'POWER_ASC':
			cards.sort(function (a,b) {
				if(!a.power) a.power = 0;
				if(!b.power) b.power = 0;

				return b.power - a.power;
			});
			break;
		case 'POWER_DESC':
			cards.sort(function (a,b) {
				if(!a.power) a.power = 0;
				if(!b.power) b.power = 0;

				return a.power - b.power;
			});
			break;
		case 'HEALTH_ASC':
			cards.sort(function (a,b) {
				if(!a.health) a.health = 0;
				if(!b.health) b.health = 0;

				return b.health - a.health;
			});
			break;
		case 'HEALTH_DESC':
			cards.sort(function (a,b) {
				if(!a.health) a.health = 0;
				if(!b.health) b.health = 0;

				return a.health - b.health;
			});
			break;
		default:
			return;
		}
}