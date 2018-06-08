let i1, i2;

function setup() {
  noCanvas();
  createDiv("Cálculo de MDC");
  i1 = createInput();
  i2 = createInput();
  i1.input(changed);
  i2.input(changed);
}

function changed() {
  ppa = selectAll('p');
  for (let p of ppa) p.remove();
  let a = parseInt(i1.value());
  let b = parseInt(i2.value());
  let r;
  let vs = {
    "a": a,
    "b": b,
    "mdc": []
  };
  if (isNaN(a) || isNaN(b)) return;
  if (a === 0 || b === 0) return;
  while (b !== 0) {
    let v = {};
    v['a'] = a;
    v['b'] = b;
    v['q'] = int(a / b);
    v['r'] = a % b;

    let na = b;
    let nb = a % b;
    a = na
    b = nb;
    vs.mdc.push(v);
  }
  vs["vmdc"] = a;
  vs["ab"] = abs(vs.a * vs.b);
  vs["vmmc"] = vs['ab'] / vs['vmdc'];

  results(vs);
}

function results(result) {
  createP("mdc(" + result.a + "," + result.b + ") = " + result.vmdc);
  createP("mmc(" + result.a + "," + result.b + ") = " + result.vmmc);
  createP("-----------------------------------------------------");
  createP("Solucionando MMC:");
  createP("mdc = |" + result.a + " . " + result.b + "| / " + result.vmdc + " = " + result.vmmc);
  if (result.mdc.length < 2) return;
  createP("-----------------------------------------------------");
  createP("Solucionando MDC:");
  for (let i = 0; i < result.mdc.length; i++) {
    let r = result.mdc[i];
    let s;
    if (i + 1 == result.mdc.length - 1) {
      s = r.a + " = " + r.b + " . " + r.q + " + <span style='background-color:green'>" + r.r + "</span> <-- mdc";
    } else if (i + 1 == result.mdc.length) {
      s = r.a + " = " + r.b + " . " + r.q + " + <span style='background-color:red'>" + r.r + "</span> <-- parada";
    } else {
      s = r.a + " = " + r.b + " . " + r.q + " + " + r.r;
    }
    ppa.push(createP(s));
  }
}
