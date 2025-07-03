export default function notFound(_req, res, _next) {
    res.status(404).json({ msg: 'Route not found' });
}