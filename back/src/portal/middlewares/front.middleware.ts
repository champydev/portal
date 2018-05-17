import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import * as path from 'path';
const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
    '.html'
  ];
  
  const resolvePath = (file: string) => path.resolve(`C:\Dev\Source\Perso\portal\front\dist\ceuillette`);

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  resolve(name: string): MiddlewareFunction {
    return (req, res, next) => {
        const { url } = req;
        if (url.indexOf('/api') === 1) {
          // it starts with /api --> continue with execution
          next();
        } else if (allowedExt.filter(ext => url.indexOf(ext) > 0).length > 0) {
          // it has a file extension --> resolve the file
          res.sendFile(resolvePath(url));
        } else {
          // in all other cases, redirect to the index.html!
          res.sendFile(resolvePath('index.html'));
        }
    };
 }
}
/*
import { NestFactory,Middleware,NestMiddleware } from '@nestjs/core';
import * as path from 'path';

const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
    '.html'
  ];
  
  const resolvePath = (file: string) => path.resolve(`../dist/${file}`);


@Middleware()
export class FrontMiddleware implements NestMiddleware {
  resolve(...args: any[]): ExpressMiddleware {
    return (req, res, next) => {
      const { url } = req;
      if (url.indexOf('/api') === 1) {
        // it starts with /api --> continue with execution
        next();
      } else if (allowedExt.filter(ext => url.indexOf(ext) > 0).length > 0) {
        // it has a file extension --> resolve the file
        res.sendFile(resolvePath(url));
      } else {
        // in all other cases, redirect to the index.html!
        res.sendFile(resolvePath('index.html'));
      }
    };
  }
  */