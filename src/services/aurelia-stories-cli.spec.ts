import { Worker } from 'worker_threads';
import * as path from 'path';
import * as fs from 'fs';
import { tmpdir } from 'os';
import * as assert from 'assert';

describe('aurelia-stories-cli', () => {
  it('Bad parameters', async () => {
    const tmp = path.join(tmpdir(), `aurelia-stories-${Date.now()}`);
    try {
      fs.mkdirSync(tmp);
      await new Promise<void>((resolve, reject) => {
        const worker = new Worker(path.join(process.cwd(), './src/cli.worker.js'), {
          argv: ['--cdwd', process.cwd(), '--out', tmp],
          env: process.env,
        });
        worker.on('exit', code => {
          if (code !== 0) {
            assert.strictEqual(code, 1);
            resolve();
          } else {
            reject(new Error('Must failed: bad paramter.'));
          }
        });
      });
      const files = fs.readdirSync(tmp);
      assert.strictEqual(files.length, 0);
    } finally {
      fs.rmdirSync(tmp);
    }
  });

  it('My self - so no component must be found', async () => {
    const tmp = path.join(tmpdir(), `aurelia-stories-${Date.now()}`);
    try {
      fs.mkdirSync(tmp);
      const logs: string[] = [];
      const errors: Error[] = [];
      await new Promise<void>((resolve, reject) => {
        const worker = new Worker(path.join(process.cwd(), './src/cli.worker.js'), {
          argv: ['--out', tmp],
          env: process.env,
        });
        worker.on('message', data => logs.push(data));
        worker.on('error', data => errors.push(data));
        worker.on('exit', code => {
          if (code !== 0) {
            console.log(errors);
            reject(new Error(`Worker stopped with exit code ${code}`));
          } else {
            resolve();
          }
        });
      });
      const files = fs.readdirSync(tmp);
      assert.strictEqual(files.length, 0);
    } finally {
      fs.rmdirSync(tmp);
    }
  });

  it('My self - so no component must be found - specified cwd', async () => {
    const tmp = path.join(tmpdir(), `aurelia-stories-${Date.now()}`);
    try {
      fs.mkdirSync(tmp);
      const logs: string[] = [];
      const errors: Error[] = [];
      await new Promise<void>((resolve, reject) => {
        const worker = new Worker(path.join(process.cwd(), './src/cli.worker.js'), {
          argv: ['--cwd', process.cwd(), '--out', tmp],
          env: process.env,
        });
        worker.on('message', data => logs.push(data));
        worker.on('error', data => errors.push(data));
        worker.on('exit', code => {
          if (code !== 0) {
            console.log(errors);
            reject(new Error(`Worker stopped with exit code ${code}`));
          } else {
            resolve();
          }
        });
      });
      const files = fs.readdirSync(tmp);
      assert.strictEqual(files.length, 0);
    } finally {
      fs.rmdirSync(tmp);
    }
  });

  it('Project AU2 Basic - components must be found', async () => {
    const tmp = path.join(tmpdir(), `aurelia-stories-${Date.now()}`);
    try {
      fs.mkdirSync(tmp);
      const logs: string[] = [];
      const errors: Error[] = [];
      await new Promise<void>((resolve, reject) => {
        const worker = new Worker(path.join(process.cwd(), './src/cli.worker.js'), {
          argv: ['--cwd', path.join(process.cwd(), 'examples', 'au2-basic'), '--out', tmp],
          env: process.env,
        });
        worker.on('message', data => logs.push(data));
        worker.on('error', data => errors.push(data));
        worker.on('exit', code => {
          if (code !== 0) {
            console.log(errors);
            reject(new Error(`Worker stopped with exit code ${code}`));
          } else {
            resolve();
          }
        });
      });
      const files = fs.readdirSync(tmp);
      assert.strictEqual(files.length, 3);
      assert.strictEqual(files[0], 'au2-button.stories.ts');
      assert.strictEqual(files[1], 'au2-countdown.stories.ts');
      assert.strictEqual(files[2], 'au2-empty.stories.ts');
    } finally {
      fs.rmSync(tmp, {
        recursive: true,
        force: true,
      });
    }
  });

  it('Project AU2 Basic - Merge all', async () => {
    const tmp = path.join(tmpdir(), `aurelia-stories-${Date.now()}`);
    try {
      fs.mkdirSync(tmp);
      const logs: string[] = [];
      const errors: Error[] = [];
      await new Promise<void>((resolve, reject) => {
        const worker = new Worker(path.join(process.cwd(), './src/cli.worker.js'), {
          argv: ['--cwd', path.join(process.cwd(), 'examples', 'au2-basic'), '--out', tmp, '--mergeOut', '--etaTemplate', path.join(process.cwd(), 'static', 'templates', 'common.stories.md.eta')],
          env: process.env,
        });
        worker.on('message', data => logs.push(data));
        worker.on('error', data => errors.push(data));
        worker.on('exit', code => {
          if (code !== 0) {
            console.log(errors);
            reject(new Error(`Worker stopped with exit code ${code}`));
          } else {
            resolve();
          }
        });
      });
      const files = fs.readdirSync(tmp);
      assert.strictEqual(files.length, 1);
      assert.strictEqual(files[0], 'components.stories.md');
    } finally {
      fs.rmSync(tmp, {
        recursive: true,
        force: true,
      });
    }
  });
});
