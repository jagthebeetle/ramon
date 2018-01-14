__STUB_GLOBAL_ANIMATION_FRAME_CANCELLED = false;
function stubRequestAnimationFrame(fn) {
    if (!__STUB_GLOBAL_ANIMATION_FRAME_CANCELLED) {
        setTimeout(fn.bind(null, -1), 0);
    }
}

global.cancelAnimationFrame = () => {
    __STUB_GLOBAL_ANIMATION_FRAME_CANCELLED = true;
};

global.requestAnimationFrame = stubRequestAnimationFrame;
