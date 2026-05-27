"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const actualite_routes_1 = __importDefault(require("./actualite.routes"));
const document_routes_1 = __importDefault(require("./document.routes"));
const newsletter_routes_1 = __importDefault(require("./newsletter.routes"));
const analytics_routes_1 = __importDefault(require("./analytics.routes"));
const track_routes_1 = __importDefault(require("./track.routes"));
const router = (0, express_1.Router)();
router.use('/auth', auth_routes_1.default);
router.use('/actualites', actualite_routes_1.default);
router.use('/documents', document_routes_1.default);
router.use('/newsletter', newsletter_routes_1.default);
router.use('/analytics', analytics_routes_1.default);
router.use('/track', track_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map