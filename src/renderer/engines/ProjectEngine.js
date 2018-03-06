import StoreEngine from './StoreEngine';

class ProjectEngine {

  getListProject() {
    return StoreEngine.get('projects') || [];
  }

  getProjectById(id) {
    let all_projects = StoreEngine.get('projects') || [];
    
    for(let i = 0; i < all_projects.length; i++) {

      let project = all_projects[i];

      if (project._id === id) {

        return project;
      }
    }
  }

}

export default new ProjectEngine;