import * as express from 'express';
import * as rp from 'request-promise';

const router = express.Router();

router.get('/api/pizza', (req, res, next) => {
	rp('https://www.olo.com/pizzas.json').then((resp) => {
		const orders: Array<IOrder> = JSON.parse(resp);

		const flattened: { [key: string]: number } = {};
		orders.forEach(({ toppings }) => {
			const key = toppings.join(', ');
			if (!flattened[key]) {
				flattened[key] = 1;
			} else {
				flattened[key]++;
			}
		});

		const ranked = Object.keys(flattened)
			.sort((a, b) => flattened[b] - flattened[a])
			.map((key, i) => ({ toppings: key.split(','), popularity: flattened[key], rank: i + 1  }));

		const topTwenty = ranked.slice(0, 20);

		res.json(topTwenty);
	});
});

interface IOrder {
	toppings: Array<string>;
}

export default router;
