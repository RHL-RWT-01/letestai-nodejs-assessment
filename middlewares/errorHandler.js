export default function errorHandler(err, _req, res, _next) {
    console.error('[ERROR]', err.stack || err);
    res.status(500).json({ msg: 'Internal Server Error' });
}
