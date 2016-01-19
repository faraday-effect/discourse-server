#!/usr/bin/env ruby

require 'asciidoctor'
require 'asciidoctor/extensions'

class ShoutBlock < Asciidoctor::Extensions::BlockProcessor
  PeriodRx = /\.(?= |$)/

  use_dsl

  named :shout
  on_context :paragraph
  name_positional_attributes 'vol'
  parse_content_as :simple

  def process parent, reader, attrs
    volume = ((attrs.delete 'vol') || 1).to_i
    create_paragraph parent, (reader.lines.map {|l| l.upcase.gsub PeriodRx, '!' * volume }), attrs
  end
end

class DumpBlock < Asciidoctor::Extensions::BlockProcessor
  use_dsl

  named :dumpblock
  name_positional_attributes 'file'

  def process parent, reader, attrs
    puts '*' * 40
    puts "  SELF #{self}"
    puts " ATTRS #{attrs}"
    puts "PARENT #{parent}"
    puts '-' * 40
    reader.lines.map {|line| puts line}
    puts '-' * 40
  end
end

class DumpTree < Asciidoctor::Extensions::Treeprocessor

  def process document
    blocks = document.find_by(role: "visual")
    blocks.each do |block|
      puts '=' * 40
      # puts block.lines
      # puts '-' * 40
      puts block.convert
    end
  end
end

Asciidoctor::Extensions.register do
  # block ShoutBlock
  # block DumpBlock
  treeprocessor DumpTree
end

# Asciidoctor.convert_file 'test.adoc', :safe => :safe

puts "LOADING FILE"
doc = Asciidoctor.load_file('test.adoc', safe: :safe)
puts "CONVERTING FILE"
html = doc.convert
puts "CONVERSION COMPLETE"
# puts html


# doc.find_by context: :listing, style: 'source'
#
# result = doc.find_by(role: "visual")
# puts result
#
# for block in result do
#   puts '=' * 40
#   puts block.convert
# end

#
# # for block in doc.blocks do
# #   puts block
# # end
#
# #doc.find_by { |block| block.attributes.export }
# doc = processor.$load(data, options);
#
# // doc.$convert();
#
# //// This appears to convert properly.
#
# find_options = opal.hash({ role: 'visual'});
# results = doc.$find_by(find_options);
#
# rendered = [ ];
# rendered[0] = results[0].$convert();
# rendered[1] = results[1].$convert();
#
# rendered
#
# // results[0].$convert()
