import * as React from 'react';

const App: React.FC<IAppProps> = () => {
	const [rankings, setRankings] = React.useState<IToppingsRank[]>([]);

	React.useEffect(() => {
		fetch('/api/pizza')
			.then((res) => res.json())
			.then((rankings) => setRankings(rankings));
	}, []);

	return (
		<>
			<h1 className="text-primary text-center display-4">Toppings Ranking</h1>
			<main className="container my-5">
				<section className="row justify-content-center">
					<div className="col-md-8">
						<ul className="list-group list-group-flush">
							{rankings.map((item) => (
								<li
									key={item.rank}
									className="list-group-item py-3 d-flex justify-content-between align-items-center">
									<b>Rank {item.rank}</b>
									<span>
										{item.toppings}
									</span>
									<span className="badge badge-primary badge-pill">
										{item.popularity}
									</span>
								</li>
							))}
						</ul>
					</div>
				</section>
			</main>
		</>
	);
};

interface IAppProps {}

interface IToppingsRank {
	toppings: string[];
	popularity: number;
	rank: number;
}

export default App;
