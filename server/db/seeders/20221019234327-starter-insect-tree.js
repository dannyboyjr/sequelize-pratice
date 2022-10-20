'use strict';

const { Tree, Insect } = require("../models")

const insectTreeData = [
  {
    insect: { name: "Western Pygmy Blue Butterfly" },
    trees: [
      { tree: "General Sherman" },
      { tree: "General Grant" },
      { tree: "Lincoln" },
      { tree: "Stagg" },
    ],
  },
  {
    insect: { name: "Patu Digua Spider" },
    trees: [
      { tree: "Stagg" },
    ],
  },
]



module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

  //  for(let insectIdx = 0; insectIdx < insectTreeData.length; insectIdx++ ){
  //       const {insect, trees} = insectTreeData[insectIdx]
  //       const currentInsect = await Insect.findOne({
  //         where: {
  //           name: insect.name
  //         }
  //       })
        
  //       for(let treeIdx = 0; treeIdx < trees.length; treeIdx++){
  //         const tree = trees[treeIdx];
  //         currentTree = await Tree.findOne({
  //           where: {
  //             tree:tree,
  //           }
  //         })

  //         await InsectTree.create({
  //           insectId: currentInsect,
  //           treeId: currentTree,
  //         })
  //       }
        
  //  }

  for (let i = 0; i < insectTreeData.length; i++) {
    const data = insectTreeData[i];
    const insect = await Insect.findOne({ where: data.insect });
    const trees = await Tree.findAll({ 
      where: { 
        [Op.or]: data.trees
      } 
    });
    await insect.addTrees(trees);
    }
  
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     for (let i = 0; i < insectTreeData.length; i++) {
      const data = insectTreeData[i];
      const insect = await Insect.findOne({ where: data.insect });
      const trees = await Tree.findAll({ where: { [Op.or]: data.trees } });
      await insect.removeTrees(trees);
    }
  }
};
