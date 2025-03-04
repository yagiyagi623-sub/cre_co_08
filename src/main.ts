import p5 from "p5";

new p5((p: p5) => {
    let t: number;

    let margin: number;

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);

        t = 0;

        margin = p.width / 10
    }

    // イージングの関数は、以下のサイトを参考にしてます
    // https://easings.net/ja

    // その1 | 直線移動
    // tを入れるとtを返す、完全に無意味な関数
    function linear(t: number) {
        return t
    }

    // その2 | イーズイン
    function easeInExpo(t: number): number {
        return t === 0 ? 0 : Math.pow(2, 10 * t - 10);
    }

    // その3 | イーズアウト
    function easeOutExpo(t: number): number {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    // その4 | イーズインアウト
    function easeInOutBack(t: number): number {
        const c1 = 1.70158;
        const c2 = c1 * 1.525;
        
        return t < 0.5
          ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
          : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
    }

    p.draw = () => {
        const x1 = p.lerp(margin, p.width - margin, linear(t));
        const x2 = p.lerp(margin, p.width - margin, easeInExpo(t));
        const x3 = p.lerp(margin, p.width - margin, easeOutExpo(t));
        const x4 = p.lerp(margin, p.width - margin, easeInOutBack(t));

        t += 0.01;
        if (t > 1) {
            t = 0;
        }

        p.clear();

        p.circle(x1, p.height / 5, 50);
        p.circle(x2, p.height / 5 * 2, 50);
        p.circle(x3, p.height / 5 * 3, 50);
        p.circle(x4, p.height / 5 * 4, 50);
    }
})