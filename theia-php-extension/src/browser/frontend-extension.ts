/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
import { ContainerModule, injectable, inject } from "inversify";
import {
    BaseLanguageClientContribution,
    LanguageClientContribution,
    LanguageClientFactory,
    Languages,
    Workspace
} from 'theia-core/lib/languages/browser';

export default new ContainerModule(bind => {
    bind<LanguageClientContribution>(LanguageClientContribution).to(PhpClientContribution)

    // initialize monaco
    monaco.languages.register({
        id: 'php',
        aliases: ['PHP', 'php'],
        extensions: ['.php'],
        mimetypes: ['text/php']
    })
    monaco.languages.setLanguageConfiguration('php', {
        comments: {
            lineComment: "//",
            blockComment: ['/*', '*/']
        },
        brackets: [['{', '}'], ['(', ')']],
        autoClosingPairs: [
            {
                open: '{',
                close: '}'
            },
            {
                open: '(',
                close: ')'
            }]
    })
})

@injectable()
export class PhpClientContribution extends BaseLanguageClientContribution {

    readonly id = "php";
    readonly name = "PHP";

    constructor(
        @inject(Workspace) protected readonly workspace: Workspace,
        @inject(Languages) protected readonly languages: Languages,
        @inject(LanguageClientFactory) protected readonly languageClientFactory: LanguageClientFactory
    ) {
        super(workspace, languages, languageClientFactory);
    }

    protected get globPatterns() {
        return [
            '**/*.php'
        ];
    }

}