QUnit.module('Selection containers - Single');

var SingleSelection = require('select2/selection/single');

var $ = require('jquery');
var Options = require('select2/options');
var Utils = require('select2/utils');

var options = new Options({});

QUnit.test('display uses templateSelection', function (assert) {
  var called = false;

  var templateOptions = new Options({
    templateSelection: function (data) {
      called = true;

      return data.text;
    }
  });

  var selection = new SingleSelection(
    $('#qunit-fixture .single'),
    templateOptions
  );

  var out = selection.display({
    text: 'test'
  });

  assert.ok(called);

  assert.equal(out, 'test');
});

QUnit.test('templateSelection can addClass', function (assert) {
  var called = false;

  var templateOptions = new Options({
    templateSelection: function (data, container) {
      called = true;
      container.addClass('testclass');
      return data.text;
    }
  });

  var selection = new SingleSelection(
    $('#qunit-fixture .single'),
    templateOptions
  );

  var $container = selection.selectionContainer();

  var out = selection.display({
    text: 'test'
  }, $container);

  assert.ok(called);

  assert.equal(out, 'test');

  assert.ok($container.hasClass('testclass'));
});

QUnit.test('empty update clears the selection', function (assert) {
  var selection = new SingleSelection(
    $('#qunit-fixture .single'),
    options
  );

  var $selection = selection.render();
  var $rendered = $selection.find('.select2-selection__rendered');

  $rendered.text('testing');

  selection.update([]);

  assert.equal(
    $rendered.text(),
    '',
    'There should have been nothing rendered'
  );
});

QUnit.test('empty update clears the selection title', function (assert) {
  var selection = new SingleSelection(
    $('#qunit-fixture .single'),
    options
  );

  var $selection = selection.render();
  var $rendered = $selection.find('.select2-selection__rendered');

  $rendered.attr('title', 'testing');

  selection.update([]);

  assert.equal(
    $rendered.attr('title'),
    undefined,
    'The title should be removed if nothing is rendered'
  );
});

QUnit.test('update renders the data text', function (assert) {
  var selection = new SingleSelection(
    $('#qunit-fixture .single'),
    options
  );

  var $selection = selection.render();
  var $rendered = $selection.find('.select2-selection__rendered');

  selection.update([{
    text: 'test'
  }]);

  assert.equal($rendered.text(), 'test');
});

QUnit.test('update sets the title to the data text', function (assert) {
  var selection = new SingleSelection(
    $('#qunit-fixture .single'),
    options
  );

  var $selection = selection.render();
  var $rendered = $selection.find('.select2-selection__rendered');

  selection.update([{
    text: 'test'
  }]);

  assert.equal(
    $rendered.attr('title'),
    'test',
    'The title should have been set to the text'
  );
});

QUnit.test('update sets the title to the data title', function (assert) {
  var selection = new SingleSelection(
    $('#qunit-fixture .single'),
    options
  );

  var $selection = selection.render();
  var $rendered = $selection.find('.select2-selection__rendered');

  selection.update([{
    text: 'test',
    title: 'correct'
  }]);

  assert.equal(
    $rendered.attr('title'),
    'correct',
    'The title should have taken precedence over the text'
  );
});

QUnit.test('update should clear title for placeholder options', function (assert) {
  var selection = new SingleSelection(
    $('#qunit-fixture .single'),
    options
  );

  var $selection = selection.render();
  var $rendered = $selection.find('.select2-selection__rendered');

  $rendered.attr('title', 'testing');

  selection.update([{
    id: '',
    text: ''
  }]);

  assert.equal(
    $rendered.attr('title'),
    undefined,
    'The title should be removed if a placeholder is rendered'
  );
});

QUnit.test('update should clear title for options without text', function (assert) {
  var selection = new SingleSelection(
    $('#qunit-fixture .single'),
    options
  );

  var $selection = selection.render();
  var $rendered = $selection.find('.select2-selection__rendered');

  $rendered.attr('title', 'testing');

  selection.update([{
    id: ''
  }]);

  assert.equal(
    $rendered.attr('title'),
    undefined,
    'The title should be removed if there is no text or title property'
  );
});

QUnit.test('escapeMarkup is being used', function (assert) {
  var selection = new SingleSelection(
    $('#qunit-fixture .single'),
    options
  );

  var $selection = selection.render();
  var $rendered = $selection.find('.select2-selection__rendered');

  var unescapedText = '<script>bad("stuff");</script>';

  selection.update([{
    text: unescapedText
  }]);

  assert.equal(
    $rendered.text(),
    unescapedText,
    'The text should be escaped by default to prevent injection'
  );
});

QUnit.test('renderTitle renders title', function(assert) {
  var selection = new SingleSelection(
    $('#qunit-fixture .single'),
    options
  );

  var $selection = selection.render();
  var $rendered = $selection.find('.select2-selection__rendered');

  selection.update([{
    text: 'test'
  }]);

  assert.equal($rendered.attr('title'), 'test');
});

QUnit.test('no renderTitle does not render any title', function(assert) {
  var selection = new SingleSelection(
    $('#qunit-fixture .single'),
    new Options({ renderTitle: false })
  );

  var $selection = selection.render();
  var $rendered = $selection.find('.select2-selection__rendered');

  selection.update([{
    text: 'test'
  }]);

  assert.equal($rendered.attr('title'), undefined);
});
