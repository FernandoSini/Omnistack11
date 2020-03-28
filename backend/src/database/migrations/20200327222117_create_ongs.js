
exports.up = function(knex) { // up responsavel pela criação da tabela
  // criando uma nova tabela
  return knex.schema.createTable('ongs', function(table){
      table.string('id').primary()
      table.string('name').notNullable()
      table.string('email').notNullable()
      table.string('whatsapp').notNullable()
      table.string('city').notNullable()
      table.string('uf', 2).notNullable()

  })
};

//o down é se der merda o que desfazer
exports.down = function(knex) {
   return knex.schema.dropTable('ongs')
  
};
