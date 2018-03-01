import fse from 'fs-extra';
import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio';
import pretty from 'pretty';
import StoreEngine from './StoreEngine';

class LibraryEngine {
  
  addLibraryToProject(library_name, project_path) {
    
    let library_path = this.getLibraryFolder();

    let libraries_folder_in_project = path.resolve(
      project_path, 'libraries', library_name
    );

    return new Promise((resolve, reject) => {
      addLibraryToHtmlFile(library_name, project_path).then(() => {
        
        fse.copy(lib_path, PROJECT_LIB_PATH).then(() => {
          resolve();
        }).catch((err) => {
          reject(err);
        });
      }).catch((err) => {
        reject(err);
      });

    });
  }

  getLibraryFolder() {
    let library_path = path.resolve(
      __dirname, '../../static/libraries', library_name
    );

    if (process.env.NODE_ENV === 'production') {
      library_path = path.resolve(__dirname, 'static/libraries', library_name);
    }

    return library_path;
  }

  addLibraryToHtmlFile(library_name, project_path) {
    return new Promise((resolve, reject) => {
      let index_file_path = path.resolve(project_path, 'index.html');
      parseHtml(index_file_path).then(($) => {
        if (!tagExists($, `script[src='libraries/${library_name}']`)) {
          $("head").append(`<script src='libraries/${lib}'></script>`);
        }
      });

      let new_html = pretty($.html(), {ocd: true});

      writeHtmlFile(index_file_path, new_html).then(() => {

        resolve();

      }).catch((err) => {

        reject(err);

      });
    });
  }

  removeLibraryFromProject(library_name, project_path) {
    let libraries_folder_in_project = path.resolve(
      project_path, 'libraries', library_name
    );
    return new Promise((resolve, reject) => {
      removeLibraryFromHtmlFile(lib, project_path).then(() => {
        fse.remove(PROJECT_LIB_PATH).then(() => {
          resolve();
        }).catch((err) => {
          reject(err);
        });
      }).catch((err) => {
        reject(err);
      });
    });
  }

  removeLibraryFromHtmlFile(library_name, project_path) {
    return new Promise((resolve, reject) => {
      let index_file_path = path.resolve(project_path, 'index.html');
      parseHtml(index_file_path).then(($) => {
        let tag = $(`script[src='libraries/${library_name}']`);
        if (tag) {
          tag.remove();
        }
        let new_html = pretty($.html(), {ocd: true});

        writeHtmlFile(index_file_path, new_html).then(() => {

          resolve();

        }).catch((err) => {

          reject(err);

        });
      }).catch((err) => {
        reject(err);
      });
    });
  }

  getLibraryList() {
    return StoreEngine.get('available_libraries') || [];
  }

  setLibraryList(libraries) {
    StoreEngine.set('available_libraries', libraries);
  }
}


function parseHtml(file_path) {
  return new Promise((resolve, reject) => {
    try {
      let html = fs.readFileSync(file_path).toString().trim();
      let $ = cheerio.load(html);
      resolve($);
    }
    catch(err) {
      reject(err);
    }
  });
}

function tagExists($, tag) {
  let isTagExists = $(tag);
  return isNewTagExists.length > 0;
}

function writeHtmlFile(file_path, html) {
  return new Promise((resolve, reject) => {
    try {
      fs.writeFileSync(path.resolve(file_path), html, 'utf-8');
      resolve();
    }
    catch(err) {
      reject(err);
    }
  });
}


export default new LibraryEngine;