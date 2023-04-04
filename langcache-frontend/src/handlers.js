import { rest } from 'msw';

const handlers = [

  rest.get(`${process.env.REACT_APP_API_BASE_URL}/api/duden`, (req, res, ctx) => {
    const word = req.url.searchParams.get('word');
    if (word === 'Freiheit') {
        return res(
            ctx.status(200),
            ctx.json({
              meaning:
                'Zustand, in dem jemand von bestimmten persönlichen oder gesellschaftlichen, als Zwang oder Last empfundenen Bindungen oder Verpflichtungen frei ist und sich in seinen Entscheidungen o.\u00a0\u00c4. nicht [mehr] eingeschr\u00e4nkt f\u00fchlt; Unabh\u00e4ngigkeit, Ungebundenheit',
            })
          );
    } else {
      return res(ctx.status(404));
    }
  }),
];

export { handlers };
