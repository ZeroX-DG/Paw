import fse from 'fs-extra';
import path from 'path';
import cheerio from 'cheerio';
import pretty from 'pretty';
import { toast } from 'react-toastify';

const DEFAULT_TOAST_CONFIG = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 5000,
  closeOnClick: true,
  hideProgressBar: true
};

export function addLib(lib, project_path) { 
  
  return new Promise(function(resolve, reject) {
    if (addLibToHTML(lib, project_path) && 
        addLibToFolder(lib, project_path)) {
      resolve();
    }
    else {
      reject();
    }
  });
}

export function addLibToFolder(lib, project_path) {
  let lib_path = path.resolve(
    __dirname, '../../static/libraries', lib
  );

  if (process.env.NODE_ENV === 'production') {
    lib_path = path.resolve(__dirname, 'static/libraries', lib);
  }

  const PROJECT_LIB_PATH = path.resolve(
    project_path, 'libraries', lib
  );

  try {
    fse.copySync(lib_path, PROJECT_LIB_PATH);
    return true;
  }
  catch(err) {
    console.log(err);
    return false;
  }
}

export function removeLib(lib, project_path) {
  return new Promise(function(resolve, reject) {
    if (removeLibFromHtml(lib, project_path) && 
      removeLibFromFolder(lib, project_path)) {
      resolve();
    }
    else {
      reject();
    }
  });
}

export function removeLibFromFolder(lib, project_path) {
  const PROJECT_LIB_PATH = path.resolve(
    project_path, 'libraries', lib
  );
  try{
    fse.removeSync(PROJECT_LIB_PATH);
    return true;
  }
  catch(err) {
    return false;
  }
}

export function isLibExistsInProject(lib, project_path) {
  const PROJECT_LIB_PATH = path.resolve(
    project_path, 'libraries', lib
  );
  return fse.pathExistsSync(PROJECT_LIB_PATH);
}

export function addLibToHTML(lib, project_path) {
  let index_file_path = path.resolve(project_path, 'index.html');
  let html;
  try {
    html = fse.readFileSync(index_file_path).toString().trim();
  }
  catch(err) {
    toast.error(`No index.html file found`, DEFAULT_TOAST_CONFIG);
    return false;
  }
  let $ = cheerio.load(html);
  let isNewTagExists = $(`script[src='libraries/${lib}']`);
  if (!isNewTagExists.length) {
    $("head").append(`<script src='libraries/${lib}'></script>`);
  }
  let new_html = pretty($.html(), {ocd: true});
  try {
    fse.writeFileSync(path.resolve(index_file_path), new_html, 'utf-8');
    return true;
  }
  catch(err) {
    return false;
  }
}

export function removeLibFromHtml(lib, project_path) {
  let index_file_path = path.resolve(project_path, 'index.html');
  let html;
  try {
    html = fse.readFileSync(index_file_path).toString().trim();
  }
  catch(err) {
    toast.error(`No index.html file found`, DEFAULT_TOAST_CONFIG);
    return false;
  }
  let $ = cheerio.load(html);
  let tag = $(`script[src='libraries/${lib}']`);
  if (tag) {
    tag.remove();
  }
  let new_html = pretty($.html(), {ocd: true});
  try {
    fse.writeFileSync(path.resolve(index_file_path), new_html, 'utf-8');
    return true;
  }
  catch(err) {
    return false;
  }
}